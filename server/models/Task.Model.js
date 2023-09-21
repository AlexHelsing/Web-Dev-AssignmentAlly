const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  TaskName: {
    type: String,
  },
  Description: {
    type: String,
    required: true,
  },
  Assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
    ref: 'Group',
    required: true,
  },
  
});



module.exports = mongoose.model('Task', TaskSchema);