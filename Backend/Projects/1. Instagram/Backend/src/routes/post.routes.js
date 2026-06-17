const express = require("express")
const multer = require("multer")

const { createPostController } = require("../controllers/post.controller")

const upload = multer({ storage: multer.memoryStorage() })

const postRouter = express.Router()

postRouter.post("/", upload.single("image"), createPostController)

module.exports = postRouter