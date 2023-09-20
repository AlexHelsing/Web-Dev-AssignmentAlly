const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  TaskName: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
  },
  Assignee: {
    type: String,
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
  GroupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AssignmentGroup',
    required: true,
  }
});

module.exports = mongoose.model('Task', TaskSchema);