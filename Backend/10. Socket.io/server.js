import app from "./src/app.js";
import { createServer } from "http";
import { Server } from "socket.io";

/**
 * Create an HTTP server from the Express application.
 * Socket.IO requires an HTTP server because it upgrades
 * HTTP connections to WebSockets.
 */
const httpServer = createServer(app);

/**
 * Initialize the Socket.IO server.
 * CORS is configured to allow the frontend application
 * running on localhost:3000 to establish a socket connection.
 */
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

/**
 * Fired whenever a new client establishes
 * a Socket.IO connection with the server.
 */
io.on("connection", (socket) => {

    console.log("A user connected");

    /**
     * Listen for the "message" event emitted by the client.
     * The received message is then broadcast to all
     * connected clients.
     */
    socket.on("message", (data) => {

        console.log(`User sent: ${data}`);

        /**
         * Broadcast the received message to every
         * connected client, including the sender.
         */
        io.emit("message", data);
    });

});

/**
 * Start the HTTP server.
 * Both Express routes and Socket.IO connections
 * are served through the same server instance.
 */
httpServer.listen(3000, () => {
    console.log("Server is running on port 3000");
});