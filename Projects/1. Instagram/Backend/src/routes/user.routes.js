const express = require("express")

const identifyUser = require("../middlewares/auth.middleware")

const {
    followUserController,
    unfollowUserController,
    getPendingRequestsController,
    acceptFollowRequestController,
    rejectFollowRequestController,
    getFollowersController,
    getFollowingController
} = require("../controllers/user.controller")

const userRouter = express.Router()

userRouter.post("/follow/:username", identifyUser, followUserController)
userRouter.post("/unfollow/:username", identifyUser, unfollowUserController)
userRouter.get("/requests", identifyUser, getPendingRequestsController)
userRouter.patch("/requests/:id/accept", identifyUser, acceptFollowRequestController)
userRouter.patch("/requests/:id/reject", identifyUser, rejectFollowRequestController)

userRouter.get("/followers/:username", getFollowersController)
userRouter.get("/following/:username", getFollowingController)

module.exports = userRouter