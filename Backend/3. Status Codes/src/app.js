const express = require("express")

const app = express()
app.use(express.json())

const notes = []

app.post("/notes", (req, res) => {
    notes.push(req.body)
    res.status(201).json({
        message: "Note created successfully."
    })
    console.log(notes)
})

app.get("/notes", (req, res) => {
    res.status(200).json({
        notes: notes
    })
})

app.delete("/notes/:id", (req, res) => {
    delete notes[req.params.id]
    res.status(204).json({
        message: "Not deleted successfully."
    })
})

app.patch("/notes/:id", (req, res) => {
    notes[req.params.id].description = req.body.description
    res.status(200).json({
        message: "Note updated successfully."
    })
})

app.get("/", (req, res) => {
    res.send("Hello World!...")
})

app.listen(3000, () => {
    console.log("server running on port 3000")
})

module.exports = app