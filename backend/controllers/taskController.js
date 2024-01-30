const asyncHandler = require('express-async-handler');
const Task = require('../models/taskModel');

const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json({
    count: tasks.length,
    tasks: tasks,
  });
});

const getTaskById = asyncHandler(async (req, res) => {
  const existTask = await Task.findById(req.params.taskId);
  if (!existTask) {
    res.status(400);
    throw new Error('Task not found');
  }
  res.status(200).json(existTask);
});

const createTask = asyncHandler(async (req, res) => {
  console.log(req.body);

  const taskIsDone = req.body.isDone ? req.body.isDone : false;

  if (!req.body.title) {
    res.status(400);
    throw new Error('Please enter task title');
  }

  const newTask = await Task.create({
    title: req.body.title,
    isDone: taskIsDone,
  });
  res.status(200).json(newTask);
});

const updateTask = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error('Please enter task title');
  }

  const existTask = await Task.findById(req.params.taskId);
  if (!existTask) {
    res.status(400);
    throw new Error('Task not found');
  }

  const updatedTask = await Task.findByIdAndUpdate(
    req.params.taskId,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedTask);
});

const deleteTask = asyncHandler(async (req, res) => {
  const taskToDelete = await Task.findById(req.params.taskId);
  if (!taskToDelete) {
    res.status(400);
    throw new Error('Task not found');
  }

  await Task.findByIdAndDelete(req.params.taskId);
  res.status(200).json({
    message: `Task with id ${req.params.taskId} was deleted successfully`,
  });
});

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask };
