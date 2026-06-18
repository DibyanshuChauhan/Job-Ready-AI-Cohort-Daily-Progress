const express = require("express")
const multer = require("multer")

const { createPostController, getPostController, getPostDetailsController } = require("../controllers/post.controller")

const upload = multer({ storage: multer.memoryStorage() })

const postRouter = express.Router()

postRouter.post("/", upload.single("image"), createPostController)

postRouter.get("/", getPostController)

postRouter.get("/details/:postId", getPostDetailsController)

module.exports = postRouter