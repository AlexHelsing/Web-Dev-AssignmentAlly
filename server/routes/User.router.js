const UserRouter = require('express').Router();

const UserController = require('../controller/User.controller');

UserRouter.get('/getUserTest', UserController.getAllUsers);
UserRouter.post('/createUserTest', UserController.createUser);

module.exports = UserRouter;
