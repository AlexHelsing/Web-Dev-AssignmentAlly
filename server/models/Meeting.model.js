const mongoose = require('mongoose');

const MeetingSchema = new mongoose.Schema({
  MeetingID: {
    type: String,
    required: true,
    unique: true,
  },
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
    required: true,
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
