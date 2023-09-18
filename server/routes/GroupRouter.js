const GroupRouter = require('express').Router();

const GroupController = require('../controller/Group.controller');

GroupRouter.put('/create-group', GroupController.createGroup);
GroupRouter.delete('/:course/delete-group', GroupController.deleteGroup);
GroupRouter.get('/getAllGroups', GroupController.getAllGroups);
GroupRouter.get('/:course', GroupController.getGroup);

module.exports = GroupRouter;
