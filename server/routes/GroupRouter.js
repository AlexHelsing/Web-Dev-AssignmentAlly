const GroupRouter = require('express').Router();

const GroupController = require('../controller/Group.controller');

GroupRouter.post('/', GroupController.createGroup);
GroupRouter.get('/', GroupController.getAllGroups);
GroupRouter.get('/myGroups', GroupController.getMyGroups);
GroupRouter.get('/:id', GroupController.getGroup);
GroupRouter.patch('/:groupName', GroupController.joinGroup);
GroupRouter.patch('/:groupId/set-resource/:type/', GroupController.setResource);
GroupRouter.delete('/', GroupController.deleteAllGroups);
GroupRouter.delete('/:Id', GroupController.deleteGroup);
// GroupRouter.patch(
//   '/:groupId/invite/:username',
//   GroupController.InviteMemberToGroup
// );
GroupRouter.post('/:groupId/users', GroupController.InviteMemberToGroup);
GroupRouter.get('/:groupId/users', GroupController.getUsersFromGroup);
GroupRouter.get('/:groupId/users/:userId', GroupController.getUserFromGroup);
GroupRouter.delete(
  '/:groupId/users/:userId',
  GroupController.removeUserFromGroup
);

module.exports = GroupRouter;
