const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "UserName already exists."],
        required: [true, "UserName is required."]
    },
    email: {
        type: String,
        unique: [true, "With this email id user account already exists."],
        required: [true, "Email is required."]
    },
    password: {
        type: String,
        required: [true, "Password is required."]
    },
    bio: String,
    profileImage: {
        type: String,
        default: "https://ik.imagekit.io/4dxhabhfm/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.webp"
    },
    isPrivate: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel