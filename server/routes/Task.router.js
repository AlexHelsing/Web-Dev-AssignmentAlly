const TaskRouter = require('express').Router();

const TaskController = require('../controller/Task.controller');

//tasks/

TaskRouter.get('/', TaskController.getAllTasks);
TaskRouter.get('/tasks', TaskController.getUserTasks);
TaskRouter.delete('/', TaskController.deleteAllTasks);
TaskRouter.post('/:groupId', TaskController.createTask);
TaskRouter.get('/:taskId', TaskController.getTask);
// Fix below to only /:groupId, doesnt currently work for some reason
TaskRouter.get('/getTasksByGroup/:groupId', TaskController.getTasksByGroup);
TaskRouter.delete('/:taskId', TaskController.deleteTask);
// TaskRouter.put('/assign-task/:taskId', TaskController.assignTaskToUser);
TaskRouter.put('/:taskId', TaskController.updateTask);
TaskRouter.put('/change-task-status/:taskId', TaskController.changeTaskStatus);

module.exports = TaskRouter;
