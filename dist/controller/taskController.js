"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTasks = void 0;
const Task_1 = __importDefault(require("../models/Task"));
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield Task_1.default.find();
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getTasks = getTasks;
const createTask = (req, res, io) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, status, dueDate } = req.body;
    const newTask = new Task_1.default({
        title: title || "Untitled Task",
        status: status || "Pending",
        dueDate: dueDate || new Date().toISOString().split("T")[0],
    });
    try {
        const savedTask = yield newTask.save();
        io.emit("task_created", savedTask); // Emit task_created event
        res.status(201).json(savedTask);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.createTask = createTask;
const updateTask = (req, res, io) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(id);
    try {
        const updatedTask = yield Task_1.default.findByIdAndUpdate(id, req.body, { new: true });
        if (updatedTask) {
            io.emit("task_updated", updatedTask);
            res.json(updatedTask);
        }
        else {
            res.status(404).json({ message: "Task not found" });
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res, io) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(id);
    try {
        yield Task_1.default.findByIdAndDelete(id);
        io.emit("task_deleted", id);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteTask = deleteTask;
//# sourceMappingURL=taskController.js.map