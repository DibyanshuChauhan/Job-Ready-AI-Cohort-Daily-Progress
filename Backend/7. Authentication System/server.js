require("dotenv").config()
const app = require("./src/app")
const connectToDb = require("./src/config/db")
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

connectToDb()

app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`)
})