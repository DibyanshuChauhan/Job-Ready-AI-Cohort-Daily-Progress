const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")

// Send follow request or directly follow a public account
const followUserController = async (req, res) => {

    try {

        const followerUsername = req.user.username
        const followeeUsername = req.params.username

        // Prevent users from following themselves
        if (followerUsername === followeeUsername) {
            return res.status(400).json({
                message: "You cannot follow yourself."
            })
        }

        // Check whether the target user exists
        const followee = await userModel.findOne({
            username: followeeUsername
        })

        if (!followee) {
            return res.status(404).json({
                message: "User not found."
            })
        }

        // Prevent duplicate follow requests/follows
        const existingFollow = await followModel.findOne({
            follower: followerUsername,
            followee: followeeUsername
        })

        if (existingFollow) {
            return res.status(400).json({
                message: "Follow request already exists."
            })
        }

        // Private accounts require approval
        // Public accounts are followed immediately
        const status = followee.isPrivate ? "pending" : "accepted"

        const followRecord = await followModel.create({
            follower: followerUsername,
            followee: followeeUsername,
            status
        })

        return res.status(201).json({
            message: status === "pending" ? "Follow request sent." : "User followed successfully.",
            follow: followRecord
        })

    } catch (err) {

        return res.status(500).json({
            message: err.message
        })

    }

}

// Remove an existing follow relationship
const unfollowUserController = async (req, res) => {

    try {

        const followerUsername = req.user.username
        const followeeUsername = req.params.username

        const follow = await followModel.findOne({
            follower: followerUsername,
            followee: followeeUsername
        })

        if (!follow) {
            return res.status(404).json({
                message: "Follow relationship not found."
            })
        }

        await followModel.findByIdAndDelete(follow._id)

        return res.status(200).json({
            message: "User unfollowed successfully."
        })

    } catch (err) {

        return res.status(500).json({
            message: err.message
        })

    }

}

// Fetch all pending follow requests received by logged-in user
const getPendingRequestsController = async (req, res) => {

    try {

        const username = req.user.username

        const requests = await followModel.find({
            followee: username,
            status: "pending"
        })

        return res.status(200).json({
            requests
        })

    } catch (err) {

        return res.status(500).json({
            message: err.message
        })

    }

}

// accept a follow request
const acceptFollowRequestController = async (req, res) => {

    try {

        const username = req.user.username

        const request = await followModel.findById(req.params.id)

        if (!request) {
            return res.status(404).json({
                message: "Request not found."
            })
        }

        // Only the receiver of the request can accept it
        if (request.followee !== username) {
            return res.status(403).json({
                message: "Unauthorized action."
            })
        }

        if (request.status !== "pending") {
            return res.status(400).json({
                message: "Request has already been processed."
            })
        }

        request.status = "accepted"

        await request.save()

        return res.status(200).json({
            message: "Follow request accepted.",
            request
        })

    } catch (err) {

        return res.status(500).json({
            message: err.message
        })

    }

}

// Reject a follow request
const rejectFollowRequestController = async (req, res) => {

    try {

        const username = req.user.username

        const request = await followModel.findById(req.params.id)

        if (!request) {
            return res.status(404).json({
                message: "Request not found."
            })
        }

        // Only the receiver of the request can reject it
        if (request.followee !== username) {
            return res.status(403).json({
                message: "Unauthorized action."
            })
        }

        if (request.status !== "pending") {
            return res.status(400).json({
                message: "Request has already been processed."
            })
        }

        request.status = "rejected"

        await request.save()

        return res.status(200).json({
            message: "Follow request rejected.",
            request
        })

    } catch (err) {

        return res.status(500).json({
            message: err.message
        })

    }

}

// Get all accepted followers of a specific user
const getFollowersController = async (req, res) => {

    const username = req.params.username

    const followers = await followModel.find({
        followee: username,
        status: "accepted"
    })

    res.status(200).json({
        count: followers.length,
        followers
    })

}

// Get all accounts that a specific user follows
const getFollowingController = async (req, res) => {

    const username = req.params.username

    const following = await followModel.find({
        follower: username,
        status: "accepted"
    })

    res.status(200).json({
        count: following.length,
        following
    })

}

module.exports = {
    followUserController,
    unfollowUserController,
    getPendingRequestsController,
    acceptFollowRequestController,
    rejectFollowRequestController,
    getFollowersController,
    getFollowingController
}