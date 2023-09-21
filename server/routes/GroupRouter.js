const GroupRouter = require('express').Router();

const GroupController = require('../controller/Group.controller');

GroupRouter.post('/create-group', GroupController.createGroup);
GroupRouter.delete('/:course/delete-group', GroupController.deleteGroup);
// GroupRouter.get('/getAllGroups', GroupController.getAllGroups);
GroupRouter.get('/get-course/:id', GroupController.getGroup);
GroupRouter.get('/getMyGroups', GroupController.getMyGroups);

GroupRouter.post(
  '/:groupId/invite/:username',
  GroupController.InviteMemberToGroup
);

module.exports = GroupRouter;
