const TaskRouter = require('express').Router();

const TaskController = require('../controller/Task.controller');

TaskRouter.post('/create-task/:projectId', TaskController.createTask);
TaskRouter.get('/get-task/:taskId', TaskController.getTask);
TaskRouter.put('/update-task/:taskId', TaskController.updateTask);
TaskRouter.delete('/delete-task/:taskId', TaskController.deleteTask);
TaskRouter.put('/assign-task/:taskId', TaskController.assignTaskToUser); // Add assign-task route
TaskRouter.put('/change-task-status/:taskId', TaskController.changeTaskStatus); // Add change-task-status route

module.exports = TaskRouter;