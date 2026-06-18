const express = require("express")
const multer = require("multer")

const { createPostController,
    getPostController,
    getPostDetailsController
} = require("../controllers/post.controller")
const identifyUser = require("../middlewares/auth.middleware")

const upload = multer({ storage: multer.memoryStorage() })

const postRouter = express.Router()

postRouter.post("/", upload.single("image"), identifyUser, createPostController)

postRouter.get("/", identifyUser, getPostController)

postRouter.get("/details/:postId", identifyUser, getPostDetailsController)

module.exports = postRouter