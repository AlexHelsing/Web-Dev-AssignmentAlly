const TaskRouter = require('express').Router();

const TaskController = require('../controller/Task.controller');



// Post 
TaskRouter.post('/create-task/:groupId', TaskController.createTask);

// Get
TaskRouter.get('/get-task/:taskId', TaskController.getTask);
TaskRouter.get('/getTasksByGroup/:groupId', TaskController.getTasksByGroup);
TaskRouter.get('/getUserTasks', TaskController.getUserTasks);

// Delete '
TaskRouter.delete('/:taskId', TaskController.deleteTask);

// Put 
TaskRouter.put('/update-task/:taskId', TaskController.updateTask);


// Un-used 
TaskRouter.put('/assign-task/:taskId', TaskController.assignTaskToUser); // Add assign-task route
TaskRouter.put('/change-task-status/:taskId', TaskController.changeTaskStatus); // Add change-task-status route


module.exports = TaskRouter;
