const mongoose = require('mongoose');

const MeetingSchema = new mongoose.Schema({
  MeetingName: {
    type: String,
    required: true,
  },
  MeetingDate: {
    type: Date,
    required: true,
  },
  MeetingLocation: {
    type: String,
  },
  MeetingAgenda: {
    type: String,
  },
  //   MeetingAttendees: [
  //     {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: 'User',
  //     },
  //   ],

  GroupID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AssignmentGroup',
  },
});

module.exports = mongoose.model('Meeting', MeetingSchema);
