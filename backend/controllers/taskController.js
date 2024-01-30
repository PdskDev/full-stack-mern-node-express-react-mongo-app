const asyncHandler = require('express-async-handler');
const Task = require('../models/taskModel');

const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json(tasks);
});

const getTaskById = asyncHandler((req, res) => {
  res.status(200).json({
    message: `The id of task is ${req.params.taskId}`,
  });
});

const createTask = asyncHandler((req, res) => {
  console.log(req.body);

  if (!req.body.title) {
    res.status(400);
    throw new Error('Please enter task title');
  }
  res.status(200).json({
    message: `Task is created with id ${Math.floor(Math.random() * 99) + 1}`,
  });
});

const updateTask = asyncHandler((req, res) => {
  res.status(200).json({
    message: `Task ${req.params.taskId} is updated successfully`,
  });
});

const deleteTask = asyncHandler((req, res) => {
  res.status(200).json({
    message: `Task ${req.params.taskId} is deleted successfully`,
  });
});

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask };
