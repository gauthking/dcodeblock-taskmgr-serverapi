import { Router } from "express";
import { createTask, deleteTask, getTasks, updateTask } from "../controller/taskController";
import { Server } from "socket.io";

const router = Router();

export default (io: Server) => {
    router.get("/", getTasks);

    router.post("/", (req, res) => createTask(req, res, io));
    router.put("/:id", (req, res) => updateTask(req, res, io));
    router.post("/:id", (req, res) => deleteTask(req, res, io));

    return router;
};