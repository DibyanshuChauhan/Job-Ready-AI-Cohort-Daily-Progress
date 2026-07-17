import userModel from "../models/user.model.js"
import jwt from "jsonwebtoken"
import { sendEmail } from "../services/mail.service.js"

export const registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        console.log("==================================");
        console.log("🚀 Registration Request Received");
        console.log({ username, email });
        console.log("==================================");

        // 1. Check if user already exists
        const existingUser = await userModel.findOne({
            $or: [{ username }, { email }],
        });

        if (existingUser) {
            console.log("❌ User already exists");

            return res.status(400).json({
                success: false,
                message: "User with this email or username already exists",
                err: "User already exists",
            });
        }

        // 2. Create user
        console.log("Creating user...");

        const newUser = await userModel.create({
            username,
            email,
            password,
        });

        console.log("✅ User created successfully");
        console.log("User ID:", newUser._id);

        // 3. Generate verification token
        const emailVerificationToken = jwt.sign(
            {
                email: newUser.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );

        console.log("✅ Verification token generated");

        // 4. Respond immediately — registration is complete regardless of email outcome
        console.log("==================================");
        console.log("✅ Registration Completed");
        console.log("==================================");

        res.status(201).json({
            success: true,
            message: "User registered successfully. Please verify your email.",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            },
        });

        // 5. Send verification email AFTER responding (fire-and-forget, doesn't block the client)
        sendEmail({
            to: email,
            subject: "Welcome to Perplexity!",
            html: `
            <div style="font-family:Arial,sans-serif;line-height:1.6;color:#333;">
                <h2>Welcome to Perplexity 🚀</h2>

                <p>Hello <strong>${username}</strong>,</p>

                <p>
                    Thank you for registering.
                </p>

                <p>
                    Please verify your email by clicking the button below.
                </p>

                
                    href="https://job-ready-ai-cohort-daily-progress-2.onrender.com/api/auth/verify-email?token=${emailVerificationToken}"
                    style="
                        display:inline-block;
                        padding:12px 24px;
                        background:#4F46E5;
                        color:white;
                        text-decoration:none;
                        border-radius:6px;
                    "
                >
                    Verify Email
                </a>

                <p style="margin-top:20px;">
                    If the button doesn't work, copy this link:
                </p>

                <p>
                    https://job-ready-ai-cohort-daily-progress-2.onrender.com/api/auth/verify-email?token=${emailVerificationToken}
                </p>

                <hr>

                <p>
                    Regards,<br>
                    <strong>Perplexity Team</strong>
                </p>
            </div>
            `,
        })
            .then(() => {
                console.log("✅ Verification email sent to", email);
            })
            .catch((mailError) => {
                console.error("==================================");
                console.error("❌ EMAIL SENDING FAILED (post-registration)");
                console.error("Message:", mailError.message);
                console.error("Stack:", mailError.stack);

                if (mailError.code) {
                    console.error("Code:", mailError.code);
                }

                if (mailError.response) {
                    console.error("Response:", mailError.response);
                }

                console.error("==================================");
                // User is already registered and already got a 201 response.
                // They can hit /resend-verification if this fails.
            });

    } catch (error) {
        console.error("==================================");
        console.error("❌ REGISTER CONTROLLER ERROR");
        console.error("Message:", error.message);
        console.error("Stack:", error.stack);

        if (error.code) {
            console.error("Code:", error.code);
        }

        if (error.name) {
            console.error("Name:", error.name);
        }

        if (error.errors) {
            console.error("Validation Errors:", error.errors);
        }

        console.error(error);
        console.error("==================================");

        return res.status(500).json({
            success: false,
            message: "Registration failed.",
            error: error.message,
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
        
        if (user.verified) {
            const alreadyVerifiedHtml = `
                <div style="max-width:600px; margin:40px auto; padding:32px; border:1px solid #e5e7eb; border-radius:8px; font-family:Arial, Helvetica, sans-serif; color:#374151; line-height:1.6;">

                    <h1 style="margin:0 0 20px; color:#4F46E5; font-size:28px;">
                        Already Verified!
                    </h1>

                    <p>Hello,</p>

                    <p>
                        It looks like your email address has <strong>already been verified</strong> previously. Your account is fully active and ready to go.
                    </p>

                    <p>
                        There is no need to verify again. You can head straight over to the login page.
                    </p>

                    <a
                        href="https://job-ready-ai-cohort-daily-progress-2.onrender.com/login"
                        style="
                            display:inline-block;
                            margin:24px 0;
                            padding:12px 24px;
                            background:#4F46E5;
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
            return res.send(alreadyVerifiedHtml);
        }

        // 4. Update the verification status (Only runs if they weren't verified yet)
        user.verified = true;
        await user.save();

        // 5. Generate FIRST TIME success landing page HTML
        const html = `
            <div style="max-width:600px; margin:40px auto; padding:32px; border:1px solid #e5e7eb; border-radius:8px; font-family:Arial, Helvetica, sans-serif; color:#374151; line-height:1.6;">

                <h1 style="margin:0 0 20px; color:#111827; font-size:28px;">
                    Email Verified Successfully 🎉
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
                    href="https://job-ready-ai-cohort-daily-progress-2.onrender.com/login"
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
        console.error("Email Verification Error:", error);

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

        return res.status(500).json({
            message: "An internal server error occurred during verification",
            success: false,
            error: error.message || error
        });
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Fetch the user from the database
        const user = await userModel.findOne({ email });

        // 2. If user doesn't exist, stop immediately
        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password",
                success: false,
                err: "User not found"
            });
        }

        // 3. Compare passwords
        const isPasswordMatch = await user.comparePassword(password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Invalid email or password",
                success: false,
                err: "Incorrect password"
            });
        }

        // 4. Ensure the user's email is verified
        if (!user.verified) {
            return res.status(400).json({
                message: "Please verify your email before logging in",
                success: false,
                err: "Email not verified"
            });
        }

        // 5. Generate authentication token
        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
            }, 
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            secure: true,
            sameSite: "none"
        });

        return res.status(200).json({
            message: "Login successful",
            success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({
            message: "An error occurred during login",
            success: false,
            error: error.message || error
        });
    }
};

export const getMe = async (req, res) => {
    try {
        // 1. Get user ID from the request object (attached by auth middleware)
        const userId = req?.user?.id;

        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized: No user ID found in request",
                success: false
            });
        }

        // 2. Fetch user data from the database, excluding the password field
        const user = await userModel.findById(userId).select("-password");

        // 3. If user doesn't exist in the database
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
                err: "User not found"
            });
        }

        // 4. Return user details successfully
        return res.status(200).json({
            message: "User details fetched successfully",
            success: true,
            user
        });

    } catch (error) {
        // Log the error for server-side debugging
        console.error("GetMe Controller Error:", error);

        // Handle invalid MongoDB ObjectId formatting error explicitly
        if (error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid User ID format",
                success: false
            });
        }

        // Fallback for any other unexpected database or server errors
        return res.status(500).json({
            message: "An internal server error occurred while fetching user profile",
            success: false,
            error: error.message || error
        });
    }
};

export const resendVerificationEmail = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email address is required",
                success: false
            });
        }

        // 1. Find the user
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found with this email address",
                success: false,
                err: "user not found"
            });
        }

        // 2. Check if user is already verified
        if (user.verified) {
            return res.status(400).json({
                message: "This email is already verified. Please login instead.",
                success: false,
                err: "already verified"
            });
        }

        // 3. Generate a fresh verification token
        const emailVerificationToken = jwt.sign({
            email: user.email
        }, process.env.JWT_SECRET, { expiresIn: "1h" }); // Good practice to give it an expiry time

        // 4. Send verification email
        await sendEmail({
            to: user.email,
            subject: "Verify your email - Perplexity",
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2>Verify Your Email Address 🚀</h2>

                    <p>Hi <strong>${user.username}</strong>,</p>

                    <p>
                        You requested a new verification link for your <strong>Perplexity</strong> account.
                    </p>

                    <p>
                        Please click the button below to verify your email address:
                    </p>

                    <a
                        href="https://job-ready-ai-cohort-daily-progress-2.onrender.com/api/auth/verify-email?token=${emailVerificationToken}"
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
                        https://job-ready-ai-cohort-daily-progress-2.onrender.com/api/auth/verify-email?token=${emailVerificationToken}
                    </p>

                    <hr />

                    <p>
                        If you didn't make this request, you can safely ignore this email.
                    </p>

                    <p>
                        Best regards,<br/>
                        <strong>The Perplexity Team</strong>
                    </p>
                </div>
            `,
        });

        return res.status(200).json({
            message: "Verification email sent successfully!",
            success: true
        });

    } catch (error) {
        console.error("Resend Verification Email Error:", error);
        return res.status(500).json({
            message: "An internal error occurred while trying to resend the email",
            success: false,
            error: error.message || error
        });
    }
};

export const logoutController = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", 
            sameSite: "strict"
        });

        return res.status(200).json({
            message: "Logout successful",
            success: true
        });
    } catch (error) {
        console.error("Logout Error:", error);
        return res.status(500).json({
            message: "An error occurred during logout",
            success: false,
            error: error.message || error
        });
    }
};