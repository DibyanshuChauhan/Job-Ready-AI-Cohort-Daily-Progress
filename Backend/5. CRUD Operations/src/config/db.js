const mongoose = require("mongoose")

const connectToDb = () => {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log("connected to database.")
        })
}

module.exports = connectToDb