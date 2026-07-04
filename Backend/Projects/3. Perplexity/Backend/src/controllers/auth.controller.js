import userModel from "../models/user.model.js"
import jwt from "jsonwebtoken"
import { sendEmail } from "../services/mail.service.js"

export const registerController = async (req, res) => {
    const { username, email, password } = req.body
    
    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            { username }, { email }
        ]
    })

    if(isUserAlreadyExists) {
        return res.status(400).json({
            message: "User with this email or username already exists",
            success: false,
            err: "user already exists"
        })
    }

    const newUser = await userModel.create({
        username,
        email,
        password
    })

    await sendEmail({
        to: email,
        subject: "Welcome to Perplexity!",
        html: `
                <p>Hi ${username},</p>
                <p>Thank you for registering at <strong>Perplexity</strong>. We're excited to have you on board!</p>
                <p>Best regards,<br>The Perplexity Team</p>
        `
    })

    res.status(201).json({
        message: "User registered successfully",
        success: true,
        user: {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email
        }
    });
}