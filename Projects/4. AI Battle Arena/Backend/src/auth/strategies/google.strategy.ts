import passport from "passport";
import {
  Strategy as GoogleStrategy,
  type Profile,
  type VerifyCallback,
} from "passport-google-oauth20";
import { AuthService } from "../services/auth.service.js";
import config from "../../config/config.js";

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

passport.serializeUser((user: Express.User, done) => {
  done(null, (user as { _id: unknown })._id?.toString());
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const { UserModel } = await import("../models/user.model.js");
    const user = await (UserModel as any).findById(id);
    done(null, user);
  } catch (err) {
    done(err as Error, undefined);
  }
});

export default passport;
