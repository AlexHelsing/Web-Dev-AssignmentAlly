const MeetingRouter = require('express').Router();

const MeetingController = require('../controller/Meeting.controller');



MeetingRouter.get('/meetings', MeetingController.getMeetingsByUser);
MeetingRouter.get('/:groupId', MeetingController.getMeetingsByGroup);
MeetingRouter.get('/:meetingId', MeetingController.getMeeting);
MeetingRouter.post('/:groupId', MeetingController.createMeeting);
MeetingRouter.patch('/:meetingId', MeetingController.updateMeeting);
MeetingRouter.delete('/:meetingId', MeetingController.deleteMeeting);

module.exports = MeetingRouter;