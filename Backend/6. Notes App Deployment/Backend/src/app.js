const express = require("express")
const noteModel = require("./models/note.model")
const app = express()
const cors = require("cors")
const path = require("path")

app.use(express.json())
app.use(cors())
app.use(express.static("./public"))

app.post("/api/notes", async (req, res) => {
    const { title, description } = req.body
    const notes = await noteModel.create({
        title, description
    })
    res.status(201).json({
        message: "Note created successfully.",
        notes
    })
});

app.get("/api/notes", async (req, res) => {
    const notes = await noteModel.find()
    res.status(200).json({
        message: "Note fetched successfully.",
        notes
    })
});

app.patch("/api/notes/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const updatedNote = await noteModel.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        if (!updatedNote) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.status(200).json({
            message: "Note updated successfully",
            updatedNote
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

app.delete("/api/notes/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deletedNote = await noteModel.findByIdAndDelete(id);

        if (!deletedNote) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.status(200).json({
            message: "Note deleted successfully",
            deletedNote
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

app.use('*name', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "/public/index.html"))
})

module.exports = app