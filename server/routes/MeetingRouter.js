const MeetingRouter = require('express').Router();

const MeetingController = require('../controller/Meeting.controller');


MeetingRouter.get('/getMeetingsByGroup/:groupId', MeetingController.getMeetingsByGroup);
MeetingRouter.get('/get-meeting/:meetingId', MeetingController.getMeeting);
MeetingRouter.get('/getMeetingsByUser', MeetingController.getMeetingsByUser);

MeetingRouter.post('/create-meeting/:groupId', MeetingController.createMeeting);

MeetingRouter.patch('/update-meeting/:meetingId', MeetingController.updateMeeting);

MeetingRouter.delete('/delete-meeting/:meetingId', MeetingController.deleteMeeting);

module.exports = MeetingRouter;