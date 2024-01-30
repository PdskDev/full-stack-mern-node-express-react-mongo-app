const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

//get all tasks
router.get('/', getTasks);

//get specific task
router.get('/:taskId', getTaskById);

//create new task
router.post('/', createTask);

//update task
router.put('/:taskId', updateTask);

//delete task
router.delete('/:taskId', deleteTask);

module.exports = router;
