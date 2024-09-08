const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// Create a new task
router.post("/", taskController.createTask);

// Get all tasks
router.get("/", taskController.getAllTasks);

// Get a task by ID
router.get("/:id", taskController.getTaskById);

// Update a task by ID
router.put("/:id", taskController.updateTaskById);

// Delete a task by ID
router.delete("/:id", taskController.deleteTaskById);

module.exports = router;
