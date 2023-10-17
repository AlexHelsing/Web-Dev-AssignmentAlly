const AssignmentGroup = require('../models/AssignmentGroup');
const Meeting = require('../models/Meeting.model');

// Create a meeting, we need to check which group the meeting is for and then update the meeting with the group ID
async function createMeeting(req, res) {
  const GroupId = req.params.groupId;
  const MeetingName = req.body.meetingName;
  const MeetingDate = req.body.date;
  const MeetingTime = req.body.time;
  const MeetingLocation = req.body.meetingLocation;
  const MeetingAgenda = req.body.meetingAgenda;

  const newMeeting = new Meeting({
    MeetingName: MeetingName,
    MeetingDate: MeetingDate,
    MeetingTime: MeetingTime,
    MeetingLocation: MeetingLocation,
    MeetingAgenda: MeetingAgenda,
    GroupId: GroupId,
  });

  try {
    const savedMeeting = await newMeeting.save();

    const populated = await Meeting.findById(savedMeeting._id).populate({
      path: 'GroupId',
      populate: {
        path: 'members',
        select: 'username',
      },
    });
    res.json(populated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function getMeetingsByGroup(req, res) {
  const groupId = req.params.groupId;

  try {
    const meetings = await Meeting.find({ GroupId: groupId }).populate({
      path: 'GroupId',
      populate: {
        path: 'members',
        select: 'username',
      },
    });

    res.json(meetings);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getMeeting(req, res) {
  const meetingId = req.params.meetingId;

  try {
    const meeting = await Meeting.findById(meetingId);

    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    res.json(meeting);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getMeetingsByUser(req, res) {
  const user = req.user;

  try {
    const meetings = await Meeting.find()
      .populate({
        path: 'GroupId',
        populate: {
          path: 'members',
          select: 'username',
        },
      })
      .then((meetings) => {
        return meetings.filter((meeting) => {
          return meeting.GroupId.members.some((member) => {
            return member.id === user.id;
          });
        });
      });

    res.json(meetings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function deleteMeeting(req, res) {
  const meetingId = req.params.meetingId;

  try {
    const deletedMeeting = await Meeting.findByIdAndRemove(meetingId);

    if (!deletedMeeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    res.json(deletedMeeting);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function updateMeeting(req, res) {
  const meetingId = req.params.meetingId;
  const {
    meetingName,
    meetingDate,
    meetingAgenda,
    meetingLocation,
    meetingTime,
  } = req.body;

  // only update fields that were actually passed...
  const updateFields = {};
  if (meetingName) updateFields.MeetingName = meetingName;
  if (meetingDate) updateFields.MeetingDate = meetingDate;
  if (meetingAgenda) updateFields.MeetingAgenda = meetingAgenda;
  if (meetingLocation) updateFields.MeetingLocation = meetingLocation;
  if (meetingTime) updateFields.MeetingTime = meetingTime;

  try {
    const updatedMeeting = await Meeting.findByIdAndUpdate(
      meetingId,
      updateFields,
      {
        new: true,
      }
    );

    if (!updatedMeeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    res.json(updatedMeeting);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function getAllMeetings(req, res) {
  try {
    const meetings = await Meeting.find().populate({
      path: 'GroupId',
      populate: {
        path: 'members',
        select: 'username',
      },
    });

    res.json(meetings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function deleteAllMeetings(req, res) {
  try {
    const deletedMeetings = await Meeting.deleteMany({});

    res.json(deletedMeetings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  createMeeting,
  getMeetingsByGroup,
  updateMeeting,
  getMeeting,
  deleteMeeting,
  getMeetingsByUser,
  getAllMeetings,
  deleteAllMeetings,
};
