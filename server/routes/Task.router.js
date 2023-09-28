const TaskRouter = require('express').Router();

const TaskController = require('../controller/Task.controller');

//tasks/

// Post 
TaskRouter.post('/create-task/:groupId', TaskController.createTask);

// Get
TaskRouter.get('/get-task/:taskId', TaskController.getTask);
TaskRouter.get('/getTasksByGroup/:groupId', TaskController.getTasksByGroup);
TaskRouter.get('/getUserTasks', TaskController.getUserTasks);

// 2g
TaskRouter.delete('/:taskId', TaskController.deleteTask);


// 2e
TaskRouter.put('/assign-task/:taskId', TaskController.assignTaskToUser); 
TaskRouter.put('/update-task/:taskId', TaskController.updateTask);





TaskRouter.put('/change-task-status/:taskId', TaskController.changeTaskStatus); 


module.exports = TaskRouter;
