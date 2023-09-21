const mongoose = require('mongoose');

const AssignmentGroupSchema = new mongoose.Schema({
  assignmentGroupName: {
    type: String,
    required: true,
    unique: true,
  },
  course: {
    type: String,
    required: true,
    unique: false,
  },

  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('AssignmentGroup', AssignmentGroupSchema);
