const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const createPostController = async (req, res) => {

    const uploadedFile = await imagekit.files.upload({
        file: await toFile(
            req.file.buffer,
            req.file.originalname
        ),
        fileName: req.file.originalname,
    });

    return res.status(201).json({
        success: true,
        message: "Image uploaded successfully",
        data: uploadedFile,
    });
}

module.exports = { createPostController };