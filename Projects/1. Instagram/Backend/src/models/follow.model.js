const mongoose = require("mongoose")

const followSchema = new mongoose.Schema({
    follower: {
        type: String,
        required: true
    },

    followee: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: "pending",
        enum: ["pending", "accepted", "rejected"]
    }

}, {
    timestamps: true
})

followSchema.index({ follower: 1, followee: 1 }, { unique: true })

module.exports = mongoose.model("follows", followSchema)