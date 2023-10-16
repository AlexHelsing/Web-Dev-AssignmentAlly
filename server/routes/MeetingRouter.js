const MeetingRouter = require('express').Router();

const MeetingController = require('../controller/Meeting.controller');

MeetingRouter.get('/', MeetingController.getAllMeetings);
MeetingRouter.get('/meetings', MeetingController.getMeetingsByUser);
MeetingRouter.delete('/', MeetingController.deleteAllMeetings);
MeetingRouter.get('/:groupId', MeetingController.getMeetingsByGroup);
MeetingRouter.get('/:meetingId', MeetingController.getMeeting);
MeetingRouter.post('/:groupId', MeetingController.createMeeting);
MeetingRouter.put('/:meetingId', MeetingController.updateMeeting);
MeetingRouter.delete('/:meetingId', MeetingController.deleteMeeting);

module.exports = MeetingRouter;
