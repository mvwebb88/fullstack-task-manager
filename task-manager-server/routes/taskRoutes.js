const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// @desc    Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @desc    Create a new task
router.post('/', async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Task title is required' });
  }

  try {
    const newTask = await Task.create({ title });
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @desc    Update a task
router.put('/:id', async (req, res) => {
  const { title, completed } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, completed },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @desc    Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

