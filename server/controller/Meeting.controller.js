const meeting = require('../models/Meeting.model');

// Create a meeting, we need to check which group the meeting is for and then update the meeting with the group ID
async function createMeeting(req, res) {
  const groupId = req.params.groupId;
  const meetingName = req.body.meetingName;
  const meetingDate = req.body.meetingDate;
  const MeetingLocation = req.body.meetingLocation;
  const MeetingAgenda = req.body.meetingAgenda;

  const newMeeting = new meeting({
    MeetingName: meetingName,
    MeetingDate: meetingDate,
    MeetingLocation: MeetingLocation,
    MeetingAgenda: MeetingAgenda,
    GroupID: groupId,
  });

  try {
    const savedMeeting = await newMeeting.save();
    res.json(savedMeeting);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = { createMeeting };
