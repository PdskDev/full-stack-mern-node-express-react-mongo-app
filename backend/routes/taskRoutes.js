const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const { protect } = require('../middleware/authHandler');

//get all tasks
router.get('/', protect, getTasks);

//get specific task
router.get('/:taskId', protect, getTaskById);

//create new task
router.post('/', protect, createTask);

//update task
router.put('/:taskId', protect, updateTask);

//delete task
router.delete('/:taskId', protect, deleteTask);

module.exports = router;
