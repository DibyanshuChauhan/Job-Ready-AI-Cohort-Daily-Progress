import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

const sendTokenResponse = async (user, res, message) => {
    const token = jwt.sign({
        id: user._id,
    }, config.JWT_SECRET, {
        expiresIn: "7d"
    })

    await res.cookies("token", token)

    res.status(200).json({
        message,
        success: true,
        token,
        user: {
            id: user._id,
            email: user.email,
            contact: user.contact,
            fullname: user.fullname,
            role: user.role
        }
    })
}

export const registerUser = async (req, res) => {
    const { email, contact, password, fullname, isSeller } = req.body;

    try {
        const existedUser = await UserModel.findOne({
            $or: [
                { email }, { contact }
            ]
        });
        if (existedUser) {
            return res.status(400).json({
                message: "User with this email already exists."
            })
        }
        const newUser = await UserModel.create({
            email, 
            contact, 
            password, 
            fullname,
            role: isSeller ? "seller" : "buyer"
        })

        await sendTokenResponse(newUser, res, "User registered successfully.")

    } catch (error) {
        return res.status(500).json({
            message: "Server error occurred while registering the user."
        })
    }
}