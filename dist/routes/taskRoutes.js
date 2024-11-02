"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = require("../controller/taskController");
const router = (0, express_1.Router)();
exports.default = (io) => {
    router.get("/", taskController_1.getTasks);
    router.post("/", (req, res) => (0, taskController_1.createTask)(req, res, io));
    router.put("/:id", (req, res) => (0, taskController_1.updateTask)(req, res, io));
    router.post("/:id", (req, res) => (0, taskController_1.deleteTask)(req, res, io));
    return router;
};
//# sourceMappingURL=taskRoutes.js.map