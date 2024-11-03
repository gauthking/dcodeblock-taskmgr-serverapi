import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import taskRoutes from "./routes/taskRoutes";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "https://dcodeblock-taskmgr-client.onrender.com",
        methods: ["GET", "POST", "PUT"],
        credentials: true,
    },
});

app.use(cors({
    origin: "https://dcodeblock-taskmgr-client.onrender.com",
    methods: ["GET", "POST", "PUT"],
    credentials: true,
}));
app.use(bodyParser.json());

app.use("/tasks", taskRoutes(io));  // Pass io instance to routes

const mongoURI = process.env.MONGODB_URL;
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as any);

// Listen for socket connections
io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

const PORT = process.env.PORT||8001;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
