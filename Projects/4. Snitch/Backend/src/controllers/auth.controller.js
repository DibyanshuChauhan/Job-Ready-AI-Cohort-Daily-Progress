import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

const sendTokenResponse = async (user, res, message) => {
    const token = jwt.sign({
        id: user._id,
    }, config.JWT_SECRET, {
        expiresIn: "7d"
    })

    res.cookie("token", token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 })

    res.status(200).json({
        message,
        success: true,
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

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User not found."
            })
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid password."
            })
        }
        await sendTokenResponse(user, res, "User logged in successfully.")

    } catch (error) {
        return res.status(500).json({
            message: "Server error occurred while logging in the user."
        })
    }
}