const express = require("express")

const app = express()
app.use(express.json())

const notes = []

app.post("/notes", (req, res) => {
    notes.push(req.body)
    res.send(req.body)
})

app.get("/notes", (req, res) => {
    res.send(notes)
})

app.delete("/notes/:index", (req, res) => {
    delete notes[req.params.index]
    res.send("note deleted successfully")
})

app.patch("/notes/:index", (req, res) => {
    notes[req.params.index].description = req.body.description
    res.send("note updated successfully")
})

app.listen(3000, () => {
    console.log("server is running at port 3000")
})

module.exports = app