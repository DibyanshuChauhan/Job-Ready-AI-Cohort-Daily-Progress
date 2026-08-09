import passport from "passport";
import {
  Strategy as GoogleStrategy,
  type Profile,
  type VerifyCallback,
} from "passport-google-oauth20";
import { AuthService } from "../services/auth.service.js";
import config from "../../config/config.js";

// ── Initialise Google OAuth 2.0 strategy ──────────────────────────────────
//
// After Google verifies the user, `done` is called with the MongoDB user
// document — AuthService.findOrCreateGoogleUser() handles storing the
// profile (googleId, email, displayName, avatar) in the database.
// ─────────────────────────────────────────────────────────────────────────

passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: config.GOOGLE_CALLBACK_URL,
      scope: ["profile", "email"],
    },
    async (
      _accessToken: string,
      _refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      try {
        const email = profile.emails?.[0]?.value;
        const avatar = profile.photos?.[0]?.value;

        if (!email) {
          return done(new Error("Google account has no associated email"), undefined);
        }

        // Persist / update user in MongoDB
        const user = await AuthService.findOrCreateGoogleUser({
          googleId: profile.id,
          email,
          displayName: profile.displayName || email.split("@")[0] || "User",
          ...(avatar ? { avatar } : {}),
        });

        return done(null, user);
      } catch (err) {
        return done(err as Error, undefined);
      }
    }
  )
);

// Minimal session serialisation (stores only MongoDB _id)
passport.serializeUser((user: Express.User, done) => {
  done(null, (user as { _id: unknown })._id?.toString());
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const { UserModel } = await import("../models/user.model.js");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = await (UserModel as any).findById(id);
    done(null, user);
  } catch (err) {
    done(err as Error, undefined);
  }
});

export default passport;
