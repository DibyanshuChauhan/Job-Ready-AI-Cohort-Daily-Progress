const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
const postModel = require("../models/post.model");

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const createPostController = async (req, res) => {

    const token = req.cookies.token

    if (!token) {
        res.status(401).json({
            message: "Token not provided, Unauthorized access."
        })
    }

    let decoded = null

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        res.status(401).json({
            message: "User not authorized."
        })
    }

    const uploadedFile = await imagekit.files.upload({
        file: await toFile(
            req.file.buffer,
            req.file.originalname
        ),
        fileName: req.file.originalname,
        folder: "/Insta-Project"
    });

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: uploadedFile.url,
        user: decoded.id
    })

    return res.status(201).json({
        success: true,
        message: "Post created successfully",
        post,
        data: uploadedFile,
    });
}

const getPostController = async (req, res) => {
    const token = req.cookies.token

    let decoded = null
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({
            message: "Token invalid."
        })
    }

    const userId = decoded.id

    const posts = await postModel.find({
        user: userId
    })

    res.status(200).json({
        success: "true",
        message: "Posts fetched successfully.",
        posts
    })
}

const getPostDetailsController = async (req, res) => {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized access."
        })
    }

    let decoded = null
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token."
        })
    }
    const userId = decoded.id
    const postId = req.params.postId

    const post = await postModel.findById( postId )

    if (!post) {
        return res.status(404).json({
            message: "Post not found."
        })
    }

    const isValidUser = post.user.toString() === userId

    if (!isValidUser) {
        return res.status(403).json({
            message: "Forbidden Content."
        })
    }

    return res.status(200).json({
        success: "true",
        message: "Post fetched successfully.",
        post
    })
}

module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController
};