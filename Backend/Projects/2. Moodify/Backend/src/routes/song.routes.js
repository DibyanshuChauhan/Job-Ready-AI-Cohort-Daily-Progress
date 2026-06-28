const express = require("express");
const upload = require("../middleware/upload.middleware");
const { uploadSongController, getSongsController } = require("../controllers/song.controller");

const songRouter = express.Router();

songRouter.post("/", upload.single("song"), uploadSongController);

songRouter.get("/", getSongsController)

module.exports = songRouter;
