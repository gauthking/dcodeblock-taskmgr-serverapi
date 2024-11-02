import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import taskRoutes from "./routes/taskRoutes";

require("dotenv").config()

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(bodyParser.json());
app.use("/tasks", taskRoutes);

const mongoURI = "your_mongo_connection_string";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true } as any)


io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

// Handle task creation and updates with real-time notifications
app.post("/tasks", (req, res) => {
    const task = req.body;
    io.emit("task_created", task); // Notify all clients about the new task
    res.status(201).json(task);
});

app.put("/tasks/:id", (req, res) => {
    const task = req.body;
    io.emit("task_updated", { ...task, id: req.params.id }); // Notify clients about the updated task
    res.status(200).json(task);
});

app.delete("/tasks/:id", (req, res) => {
    const taskId = req.params.id;
    io.emit("task_deleted", taskId); // Notify clients about the deleted task
    res.status(204).send();
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
