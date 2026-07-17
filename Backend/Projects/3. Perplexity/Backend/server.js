import "dotenv/config";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const { default: app } = await import("./src/app.js");
const { default: connectToDb } = await import("./src/config/db.js");

connectToDb();

app.listen(process.env.PORT || 3000, () => {
    console.log("server is running on port " + process.env.PORT);
});