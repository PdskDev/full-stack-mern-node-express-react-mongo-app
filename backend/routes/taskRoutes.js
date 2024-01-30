const express = require('express');
const router = express.Router();

//get all tasks
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Lecture de toutes les tâches',
  });
});

//get specific task
router.get('/:taskId', (req, res) => {
  res.status(200).json({
    message: `The id of task is ${req.params.taskId}`,
  });
});

//create new task
router.post('/', (req, res) => {
  res.status(200).json({
    message: `Task is created with id ${Math.floor(Math.random() * 99) + 1}`,
  });
});

//update task
router.put('/:taskId', (req, res) => {
  res.status(200).json({
    message: `Task ${req.params.taskId} is updated successfully`,
  });
});

//delete task
router.delete('/:taskId', (req, res) => {
  res.status(200).json({
    message: `Task ${req.params.taskId} is deleted successfully`,
  });
});

module.exports = router;
