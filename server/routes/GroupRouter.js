const GroupRouter = require('express').Router();

const GroupController = require('../controller/Group.controller');

GroupRouter.post('/create-group', GroupController.createGroup);

GroupRouter.get('/getAllGroups', GroupController.getAllGroups);

GroupRouter.get('/getMyGroups', GroupController.getMyGroups);
GroupRouter.put('/:groupId/set-resource/:type/', GroupController.setResource);

// 5.1.2.d
GroupRouter.get('/:Id', GroupController.getGroup);

// 5.1.3.a
GroupRouter.post(
  '/:groupId/invite/:username',
  GroupController.InviteMemberToGroup
);

// 5.1.2.f
GroupRouter.patch('/join-group/:groupName', GroupController.joinGroup);

// 5.1.2.g
GroupRouter.delete('/:Id', GroupController.deleteGroup);

module.exports = GroupRouter;
