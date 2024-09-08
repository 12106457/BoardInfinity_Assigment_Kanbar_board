const Task = require("../models/task");

exports.createTask = (req, res) => {
  // console.log(req.body);
  const task = new Task(req.body);
  task
    .save()
    .then((task) => res.status(201).json(task))
    .catch((err) => res.status(400).json({ error: err.message }));
};

exports.getAllTasks = (req, res) => {
  Task.find()
    .then((tasks) => res.json(tasks))
    .catch((err) => res.status(500).json({ error: err.message }));
};

exports.getTaskById = (req, res) => {
  Task.findById(req.params.id)
    .then((task) => {
      if (!task) return res.status(404).json({ error: "Task not found" });
      res.json(task);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

exports.updateTaskById = (req, res) => {
  Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((task) => {
      if (!task) return res.status(404).json({ error: "Task not found" });
      res.json(task);
    })
    .catch((err) => res.status(400).json({ error: err.message }));
};

exports.deleteTaskById = (req, res) => {
  Task.findByIdAndDelete(req.params.id)
    .then((task) => {
      if (!task) return res.status(404).json({ error: "Task not found" });
      res.json({ message: "Task deleted successfully" });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};
