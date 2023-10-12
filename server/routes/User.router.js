const UserRouter = require('express').Router();

const UserController = require('../controller/User.controller');

UserRouter.get('/getAllUsers', UserController.getAllUsers);
UserRouter.get('/:username', UserController.getUser);
UserRouter.delete('/:username/deleteUser', UserController.deleteUser),
  UserRouter.patch('/:username/changePassword', UserController.changePassword),
  // UserRouter.get()

  (module.exports = UserRouter);
