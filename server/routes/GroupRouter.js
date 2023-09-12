const GroupRouter = require('express').Router();

const GroupController = require('../controller/Group.controller');

GroupRouter.post('/create-group/', GroupController.createGroup);

module.exports = GroupRouter;
