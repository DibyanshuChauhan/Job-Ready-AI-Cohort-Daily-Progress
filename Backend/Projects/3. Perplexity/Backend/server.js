import "dotenv/config";
import app from "./src/app.js";
import dns from "dns"
dns.setServers(["8.8.8.8", "8.8.4.4"]);
import connectToDb from "./src/config/db.js";
import http from "http";
import { initSocket } from "./src/sockets/server.socket.js";

const httpServer = http.createServer(app);
initSocket(httpServer);

connectToDb()

httpServer.listen(process.env.PORT || 3000, () => {
    console.log("server is running on port " + process.env.PORT)
})
