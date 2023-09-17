const GroupRouter = require('express').Router();

const GroupController = require('../controller/Group.controller');

GroupRouter.post('/create-group', GroupController.createGroup);
GroupRouter.get('/getAllGroups', GroupController.getAllGroups);
GroupRouter.get('/:course', GroupController.getGroup);

module.exports = GroupRouter;
