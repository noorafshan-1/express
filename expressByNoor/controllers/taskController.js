const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  const { name, description } = req.body;
  try {
    const task = await Task.create({ name, description, user: req.user.id });
    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
