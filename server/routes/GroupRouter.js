const GroupRouter = require('express').Router();

const GroupController = require('../controller/Group.controller');

GroupRouter.post('/create-group', GroupController.createGroup);

// Get
GroupRouter.get('/get-group/:id', GroupController.getGroup);
GroupRouter.get('/getAllGroups', GroupController.getAllGroups);
GroupRouter.get('/getMyGroups', GroupController.getMyGroups);

// Post (relationship)
GroupRouter.post(
  '/:groupId/invite/:username',
  GroupController.InviteMemberToGroup
);

// 5.1.2.f
GroupRouter.patch('/join-group/:groupName', GroupController.joinGroup);
GroupRouter.patch('/:groupId/set-resource/:type/', GroupController.setResource);

// 5.1.2.g
GroupRouter.delete('/:Id', GroupController.deleteGroup);

module.exports = GroupRouter;
