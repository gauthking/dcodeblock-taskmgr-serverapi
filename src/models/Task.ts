import mongoose, { Document, Schema } from "mongoose";

export interface Task extends Document {
    title: string;
    status: "In Progress" | "Completed" | "Pending";
    dueDate: string;
}

const TaskSchema: Schema = new Schema({
    title: { type: String, required: true },
    status: { type: String, enum: ["In Progress", "Completed", "Pending"], default: "Pending" },
    dueDate: { type: String, required: true },
});

const TaskModel = mongoose.model<Task>("Task", TaskSchema);
export default TaskModel;
