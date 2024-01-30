const express = require('express');
const router = express.Router();

//Get all tasks
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Lecture de toutes les tâches',
  });
});

//Get specific task
router.get('/:taskId', (req, res) => {
  res.status(200).json({
    message: `The id of task is ${req.params.taskId}`,
  });
});

router.post('/', (req, res) => {
  res.status(200).json({
    message: `Task is created with id ${Math.random(5).toString}`,
  });
});

router.put('/:taskId', (req, res) => {
  res.status(200).json({
    message: `Task ${req.params.taskId} is updated successfully`,
  });
});

router.delete('/:taskId', (req, res) => {
  res.status(200).json({
    message: `Task ${req.params.taskId} is deleted successfully`,
  });
});

module.exports = router;
