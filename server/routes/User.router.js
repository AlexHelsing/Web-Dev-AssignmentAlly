const UserRouter = require('express').Router();

const passport = require('passport');
const UserController = require('../controller/User.controller');

UserRouter.get('/getUserTest', UserController.getAllUsers);
UserRouter.post('/createUserTest', UserController.createUser);

module.exports = UserRouter;
