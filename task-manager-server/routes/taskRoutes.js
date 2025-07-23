const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth); // 🔐 Apply to all routes below

// Get tasks for the logged-in user
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create task
router.post('/', async (req, res) => {
  const { title, priority, dueDate } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Task title is required' });
  }

  try {
    const newTask = await Task.create({
      title,
      priority,
      dueDate,
      user: req.user.userId, // 👈 link task to user
    });

    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update task
router.put('/:id', async (req, res) => {
  const { title, completed, priority, dueDate } = req.body;

  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      { title, completed, priority, dueDate },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;



