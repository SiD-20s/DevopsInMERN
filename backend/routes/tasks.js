const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const mongoose = require("mongoose");

// Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json({ tasks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Debug info: database name and counts
router.get("/debug", async (req, res) => {
  try {
    const dbName = mongoose.connection?.name;
    const uri = mongoose.connection?.client?.s?.url || process.env.MONGO_URI;
    const count = await Task.countDocuments();
    res.json({
      dbName,
      count,
      uriSample: uri
        ? uri.replace(
            /(mongodb(?:\+srv)?:\/\/)([^:@]+):([^@]+)@/i,
            "$1***:***@"
          )
        : null,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new task
router.post("/", async (req, res) => {
  console.log("POST body:", req.body);
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const newTask = await task.save();
    console.log("Saved task:", newTask);
    res.status(201).json(newTask);
  } catch (err) {
    console.error("Error saving task:", err);
    res.status(400).json({ message: err.message });
  }
});

// Update a task (toggle complete)
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.completed = req.body.completed ?? task.completed;
    task.title = req.body.title ?? task.title;
    task.description = req.body.description ?? task.description;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a task
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted", id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
