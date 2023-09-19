const mongoose = require('mongoose');

const AssignmentGroupSchema = new mongoose.Schema({
  course: {
    type: String,
    required: true,
    unique: true,
  },

  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      // max: 3,
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('AssignmentGroup', AssignmentGroupSchema);
