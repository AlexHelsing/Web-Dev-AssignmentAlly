const GroupRouter = require('express').Router();

const GroupController = require('../controller/Group.controller');

GroupRouter.post('/create-group', GroupController.createGroup);
GroupRouter.post('/getAllGroups', GroupController.getAllGroups);
GroupRouter.post('/:course', GroupController.getGroup);

module.exports = GroupRouter;
