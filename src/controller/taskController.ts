import { Request, Response } from "express";
import TaskModel from "../models/Task";
import { Server } from "socket.io";

export const getTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await TaskModel.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createTask = async (req: Request, res: Response, io: Server) => {
    const { title, status, dueDate } = req.body;
    const newTask = new TaskModel({
        title: title || "Untitled Task",
        status: status || "Pending",
        dueDate: dueDate || new Date().toISOString().split("T")[0],
    });

    try {
        const savedTask = await newTask.save();
        io.emit("task_created", savedTask);  // Emit task_created event
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateTask = async (req: Request, res: Response, io: Server) => {
    const { id } = req.params;
    console.log(id)
    try {
        const updatedTask = await TaskModel.findByIdAndUpdate(id, req.body, { new: true });
        if (updatedTask) {
            io.emit("task_updated", updatedTask);
            res.json(updatedTask);
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteTask = async (req: Request, res: Response, io: Server) => {
    const { id } = req.params;
    console.log(id)
    try {
        await TaskModel.findByIdAndDelete(id);
        io.emit("task_deleted", id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
