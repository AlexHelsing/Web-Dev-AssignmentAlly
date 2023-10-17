const UserRouter = require('express').Router();

const UserController = require('../controller/User.controller');

UserRouter.get('/', UserController.getAllUsers);
UserRouter.get('/:username', UserController.getUser);
UserRouter.delete('/:username', UserController.deleteUser),
  UserRouter.patch('/changePassword', UserController.changePassword),
  (module.exports = UserRouter);
