const express = require("express")

const app = express() // server instance created

app.get("/home", (req, res) => {
    res.send("This is my home page...")
})

app.get("/", (req, res) => {
    res.send("Hello world!...")
})

app.get("/about", (req, res) => {
    res.send("This is my about page...")
})

app.listen(5000) // server started