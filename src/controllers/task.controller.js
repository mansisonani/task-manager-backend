const Task = require("../models/task.model");
const redisClient = require("../config/redis");

// POST /tasks
exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await Task.create({
      title,
      description
    });

    await redisClient.del("tasks");

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /tasks
exports.getTasks = async (req, res) => {
  try {
    const cachedTasks = await redisClient.get("tasks");

    if (cachedTasks) {
      return res.status(200).json({
        source: "redis",
        data: JSON.parse(cachedTasks)
      });
    }

    const tasks = await Task.find();

    await redisClient.setEx("tasks", 60, JSON.stringify(tasks));

    res.status(200).json({
      source: "database",
      data: tasks
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
