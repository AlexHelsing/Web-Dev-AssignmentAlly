const MeetingRouter = require('express').Router();

const MeetingController = require('../controller/Meeting.controller');

MeetingRouter.post('/create-meeting/:groupId', MeetingController.createMeeting);
MeetingRouter.get('/get-meeting/:meetingId', MeetingController.getMeeting);
MeetingRouter.get(
  '/delete-meeting/:meetingId',
  MeetingController.deleteMeeting
);

module.exports = MeetingRouter;
