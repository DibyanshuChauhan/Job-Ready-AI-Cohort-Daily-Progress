require("dotenv").config()
const connectToDb = require("./src/config/db")
const app = require("./src/app")
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

connectToDb()

app.listen(process.env.PORT || 3000, () => {
    console.log("server running at port 3000")
})