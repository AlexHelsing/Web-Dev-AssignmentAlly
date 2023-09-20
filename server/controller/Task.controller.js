const Task = require('../models/Task.Model');

async function createTask(req, res) {
  const groupId = req.params.groupId;
  const { taskName, description, assignee, dueDate, priority, status } =
    req.body;

  const newTask = new Task({
    TaskName: taskName,
    Description: description,
    Assignee: assignee,
    DueDate: dueDate,
    Priority: priority,
    Status: status,
    GroupId: groupId,
  });

  try {
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function getTasksByGroup(req, res) {
  const groupId = req.params.groupId;

  try {
    const tasks = await Task.find({ GroupId: groupId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getTask(req, res) {
  const taskId = req.params.taskId;

  try {
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function updateTask(req, res) {
  const taskId = req.params.taskId;
  const { taskName, description, assignee, dueDate, priority, status } =
    req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        TaskName: taskName,
        Description: description,
        Assignee: assignee,
        DueDate: dueDate,
        Priority: priority,
        Status: status,
      },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
async function deleteTask(req, res) {
  const taskId = req.params.taskId;

  try {
    const deletedTask = await Task.findByIdAndRemove(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(deletedTask);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function assignTaskToUser(req, res) {
  const taskId = req.params.taskId;
  const { assignee } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { Assignee: assignee },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function changeTaskStatus(req, res) {
  const taskId = req.params.taskId;
  const { status } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { Status: status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = {
  createTask,
  getTask,
  updateTask,
  deleteTask,
  assignTaskToUser,
  changeTaskStatus,
  getTasksByGroup,
};
