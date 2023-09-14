const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  TaskID: {
    type: String,
    required: true,
    unique: true,
  },
  TaskName: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
  },
  Assignee: {
    type: String,
    required: true,
  },
  DueDate: {
    type: Date,
  },
  Priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
  },
  Status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Completed'],
    default: 'To Do',
  },
});

module.exports = mongoose.model('Task', TaskSchema);