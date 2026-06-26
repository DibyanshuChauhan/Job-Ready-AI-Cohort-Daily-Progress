require("dotenv").config();
const app = require("./src/app");
const connectToDb = require("./config/db");
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

connectToDb();

app.listen(process.env.PORT || 3000, () => {
  console.log("server is running at port " + process.env.PORT);
});
