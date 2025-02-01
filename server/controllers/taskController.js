const Task = require("../models/Task");

exports.addTask = async (req, res) => {
  const { description, date } = req.body;
  try {
    const newTask = new Task({ userId: req.user.id, description, date });
    await newTask.save();
    res.json(newTask);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.updateTask = async (req, res) => {
  const { description, date } = req.body;
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: "Task not found" });

    task.description = description || task.description;
    task.date = date || task.date;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    // Check if the task exists
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    // Ensure the user owns the task
    if (task.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    // Delete the task
    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: "Task removed" });
  } catch (err) {
    console.error("Error deleting task:", err.message);
    res.status(500).send("Server error");
  }
};

exports.toggleTaskCompletion = async (req, res) => {
  console.log(req.user);
  // console.log("User ID from token:", req.user.id); // Debugging
  // console.log("Task ID:", req.params.id); // Debugging
  try {
    const task = await Task.findById(req.params.id);

    // Check if the task exists
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    // Ensure the user owns the task
    if (task.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    // Toggle the completed status
    task.completed = !task.completed;
    await task.save();

    res.json(task); // Return the updated task
  } catch (err) {
    console.error("Error toggling task completion:", err.message);
    res.status(500).send("Server error");
  }
};
