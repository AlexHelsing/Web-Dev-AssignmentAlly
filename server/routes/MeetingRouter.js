const MeetingRouter = require('express').Router();

const MeetingController = require('../controller/Meeting.controller');

MeetingRouter.post('/create-meeting/:groupId', MeetingController.createMeeting);
MeetingRouter.get('/get-meeting/:meetingId', MeetingController.getMeeting);
MeetingRouter.delete('/delete-meeting/:meetingId', MeetingController.deleteMeeting);
MeetingRouter.get('/getMeetingsByGroup/:groupId', MeetingController.getMeetingsByGroup);
MeetingRouter.patch('/update-meeting/:meetingId', MeetingController.updateMeeting);

module.exports = MeetingRouter;