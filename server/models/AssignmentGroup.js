const mongoose = require('mongoose');

const AssignmentGroupSchema = new mongoose.Schema({
  Course: {
    type: String,
    required: true,
  },

  Members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      // max: 3,
    },
  ],
});

module.exports = mongoose.model('AssignmentGroup', AssignmentGroupSchema);
