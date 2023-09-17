const UserRouter = require('express').Router();

const passport = require('passport');
const UserController = require('../controller/User.controller');

UserRouter.get('/getAllUsers', UserController.getAllUsers);
//UserRouter.post('/registerUser', UserController.registerUser);
UserRouter.get('/:username', UserController.getUser);
UserRouter.post('/deleteUser', UserController.deleteUser),
UserRouter.post('/:username/changePassword', UserController.changePassword),

module.exports = UserRouter;
