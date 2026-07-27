const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const registerController = async (req, res) => {
    const { username, email, password, bio, profileImage } = req.body

    const isUserExists = await userModel.findOne({
        $or: [
            { username }, { email }
        ]
    })

    if (isUserExists) {
        return res.status(409).json({
            message: "User already exists."
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username, email, bio, profileImage, password: hash
    })

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token)

    res.status(201).json({
        message: "User Registered successfully.",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}

const loginController = async (req, res) => {
    const { username, email, password } = req.body

    const user = await userModel.findOne({
        $or: [
            { username: username }, { email: email }
        ]
    }).select("+password")

    if (!user) {
        return res.status(404).json({
            message: "User not found."
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid Password."
        })
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token)

    res.status(200).json({
        message: "User Logged in successfully.",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}

const getmeController = async (req, res) => {
    const userId = req.user.id
    const user = await userModel.findById(userId)

    if (!user) {
        return res.status(400).json({
            message: "User not found."
        })
    }

    res.status(200).json({
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}

module.exports = {
    registerController,
    loginController,
    getmeController
}