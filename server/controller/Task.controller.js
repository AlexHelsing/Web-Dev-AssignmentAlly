const Task = require('../models/Task.Model');
const User = require('../models/User.mongo');

async function createTask(req, res) {
  const groupId = req.params.groupId;
  const { taskName, description, assignee, dueDate, priority, status } =
    req.body;

  try {
    const newTask = new Task({
      TaskName: taskName,
      Description: description,
      Assignee: assignee,
      DueDate: dueDate,
      Priority: priority,
      Status: status,
      GroupId: groupId,
    });
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function getTasksByGroup(req, res) {
  const groupId = req.params.groupId;

  try {
    const tasks = await Task.find({ GroupId: groupId })
      .populate('Assignee', ['username'])
      .populate({
        path: 'GroupId',
        populate: {
          path: 'members',
          select: 'username',
        },
      });

    //
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getUserTasks(req, res) {
  const { id } = req.user;

  console.log(id);

  try {
    const tasks = await Task.find({ Assignee: id })
      .populate('Assignee', ['username'])
      .populate({
        path: 'GroupId',
        populate: {
          path: 'members',
          select: 'username',
        },
      });

    res.json(tasks);
  } catch (err) {
    console.log(err);
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

  // only update fields that were actually passed...
  const updateFields = {};
  if (taskName) updateFields.TaskName = taskName;
  if (description) updateFields.Description = description;
  if (assignee) updateFields.Assignee = assignee;
  if (dueDate) updateFields.DueDate = dueDate;
  if (priority) updateFields.Priority = priority;
  if (status) updateFields.Status = status;

  try {
    if (assignee) {
      const assigneeUserId = await User.findOne({ username: assignee }).then(
        (user) => user._id
      );
      updateFields.Assignee = assigneeUserId;
    }

    const updatedTask = await Task.findByIdAndUpdate(taskId, updateFields, {
      new: true,
    });

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
  getUserTasks,
};
