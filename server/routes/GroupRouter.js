const GroupRouter = require('express').Router();

const GroupController = require('../controller/Group.controller');

// 2a
GroupRouter.post('/create-group', GroupController.createGroup);


// 2b
GroupRouter.get('/getAllGroups', GroupController.getAllGroups);
GroupRouter.get('/getMyGroups', GroupController.getMyGroups);
GroupRouter.get('/get-group/:id', GroupController.getGroup);

// 2f
GroupRouter.patch('/join-group/:groupName', GroupController.joinGroup);
GroupRouter.patch('/:groupId/set-resource/:type/', GroupController.setResource);

// 2g
GroupRouter.delete('/:Id', GroupController.deleteGroup);

// 3a
GroupRouter.post(
  '/:groupId/invite/:username',
  GroupController.InviteMemberToGroup
);

// 3b
GroupRouter.get('/:groupId/users', GroupController.getUsersFromGroup);

// 3c
GroupRouter.get('/:groupId/users/:userId', GroupController.getUserFromGroup);

// 3d
GroupRouter.delete('/:groupId/users/:userId', GroupController.removeUserFromGroup);


module.exports = GroupRouter;
