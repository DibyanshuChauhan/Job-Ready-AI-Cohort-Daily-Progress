import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

const sendTokenResponse = async (user, res) => {
    const token = jwt.sign({
        id: user._id,
    }, config.JWT_SECRET)
}

export const registerUser = async (req, res) => {
    const { email, contact, password, fullname } = req.body;

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
            email, contact, password, fullname
        })

        // const token = 

    } catch (error) {
        return res.status(500).json({
            message: "Server error occurred while registering the user."
        })
    }
}