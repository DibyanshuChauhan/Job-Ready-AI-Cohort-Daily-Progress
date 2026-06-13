require("dotenv").config()
const app = require("./src/app")
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const connectToDb = require("./src/config/db")

connectToDb()


app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})