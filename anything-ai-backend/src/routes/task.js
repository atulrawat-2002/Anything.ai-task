const express = require("express");
const router = express.Router();
const Task = require("../models/Task.js");
const auth = require("../middlewares/auth.js");

// Get all tasks for logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get a single task by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Create a new task
router.post("/", auth, async (req, res) => {
  const { title, description, status } = req.body;
  if (!title) return res.status(400).json({ message: "Title is required" });

  try {
    const newTask = await Task.create({
      userId: req.user.id,
      title,
      description: description || "",
      status: status || "pending"
    });
    res.status(201).json(newTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update a task
router.put("/:id", auth, async (req, res) => {
  const { title, description, status } = req.body;

  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;

    task.updatedAt = Date.now();
    await task.save();

    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a task
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
