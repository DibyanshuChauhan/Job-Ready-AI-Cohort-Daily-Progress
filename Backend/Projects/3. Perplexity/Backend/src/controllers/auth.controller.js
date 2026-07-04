import userModel from "../models/user.model.js"
import jwt from "jsonwebtoken"
import { sendEmail } from "../services/mail.service.js"

export const registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // 1. Check if user already exists
        const isUserAlreadyExists = await userModel.findOne({
            $or: [
                { username }, { email }
            ]
        });

        if (isUserAlreadyExists) {
            return res.status(400).json({
                message: "User with this email or username already exists",
                success: false,
                err: "user already exists"
            });
        }

        // 2. Create new user
        const newUser = await userModel.create({
            username,
            email,
            password
        });

        // 3. Generate verification token
        const emailVerificationToken = jwt.sign({
            email: newUser.email
        }, process.env.JWT_SECRET);

        // 4. Send verification email
        await sendEmail({
            to: email,
            subject: "Welcome to Perplexity!",
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2>Welcome to Perplexity 🚀</h2>

                    <p>Hi <strong>${username}</strong>,</p>

                    <p>
                        Thank you for registering with <strong>Perplexity</strong>.
                        We're excited to have you on board!
                    </p>

                    <p>
                        Please verify your email address by clicking the button below:
                    </p>

                    <a
                        href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}"
                        style="
                            display:inline-block;
                            padding:12px 24px;
                            background:#4F46E5;
                            color:#fff;
                            text-decoration:none;
                            border-radius:6px;
                            font-weight:bold;
                        "
                    >
                        Verify Email
                    </a>

                    <p style="margin-top:20px;">
                        Or copy and paste this link into your browser:
                    </p>

                    <p>
                        http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}
                    </p>

                    <hr />

                    <p>
                        If you didn't create an account, you can safely ignore this email.
                    </p>

                    <p>
                        Best regards,<br/>
                        <strong>The Perplexity Team</strong>
                    </p>
                </div>
            `,
        });

        // 5. Send success response
        return res.status(201).json({
            message: "User registered successfully",
            success: true,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });

    } catch (error) {
        // Log the actual error for server-side debugging
        console.error("Registration Error:", error);

        // Send a generic failure response to the client
        return res.status(500).json({
            message: "Something went wrong while registering the user",
            success: false,
            error: error.message || error
        });
    }
};

export const verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;

        // 1. Check if token is provided
        if (!token) {
            return res.status(400).json({
                message: "Verification token is required",
                success: false
            });
        }

        // 2. Decode and verify the token
        // Note: If jwt.verify fails (e.g., expired/invalid token), it throws an error and jumps to the catch block
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Find the user associated with the token payload
        const user = await userModel.findOne({ email: decoded.email });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
                err: "User does not exist"
            });
        }

        // 4. Update the verification status
        user.verified = true;
        await user.save();

        // 5. Generate success landing page HTML
        // Quick fix: Adjusted 'localhost3000' to 'localhost:3000' in the login link below
        const html = `
            <div style="max-width:600px; margin:40px auto; padding:32px; border:1px solid #e5e7eb; border-radius:8px; font-family:Arial, Helvetica, sans-serif; color:#374151; line-height:1.6;">

                <h1 style="margin:0 0 20px; color:#111827; font-size:28px;">
                    Email Verified Successfully
                </h1>

                <p>Hello,</p>

                <p>
                    Your email address has been successfully verified, and your account is now active.
                </p>

                <p>
                    You can now sign in to your account and start using all the features available on
                    <strong>Perplexity</strong>.
                </p>

                <a
                    href="http://localhost:3000/login"
                    style="
                        display:inline-block;
                        margin:24px 0;
                        padding:12px 24px;
                        background:#111827;
                        color:#ffffff;
                        text-decoration:none;
                        border-radius:6px;
                        font-weight:600;
                    "
                >
                    Go to Login
                </a>

                <hr style="border:none; border-top:1px solid #e5e7eb; margin:24px 0;">

                <p style="margin:0;">
                    Regards,<br>
                    <strong>The Perplexity Team</strong>
                </p>

            </div>
        `;

        // 6. Return the HTML success page
        return res.send(html);

    } catch (error) {
        // Log the internal error for debugging
        console.error("Email Verification Error:", error);

        // Handle specific JWT expiration or malformed errors gracefully
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Verification link has expired. Please request a new one.",
                success: false
            });
        }
        
        if (error.name === "JsonWebTokenError") {
            return res.status(400).json({
                message: "Invalid or malformed verification token.",
                success: false
            });
        }

        // Fallback for database or unexpected errors
        return res.status(500).json({
            message: "An internal server error occurred during verification",
            success: false,
            error: error.message || error
        });
    }
};