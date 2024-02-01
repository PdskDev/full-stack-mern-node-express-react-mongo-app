const asyncHandler = require('express-async-handler');
const Task = require('../models/taskModel');
const appMessage = require('../messages/appMessage');

const getTasks = asyncHandler(async (req, res) => {
  //retreive only user's tasks
  const tasks = await Task.find({ user: req.user.id });
  res.status(200).json({
    count: tasks.length,
    tasks: tasks,
  });
});

const getTaskById = asyncHandler(async (req, res) => {
  const existTask = await Task.findById(req.params.taskId);
  if (!existTask) {
    res.status(400);
    throw new Error(appMessage.task.error.not_found);
  }
  res.status(200).json(existTask);
});

const createTask = asyncHandler(async (req, res) => {
  console.log(req.body);

  const taskIsDone = req.body.isDone ? req.body.isDone : false;

  if (!req.body.title) {
    res.status(400);
    throw new Error(appMessage.task.error.enter_title);
  }

  const newTask = await Task.create({
    title: req.body.title,
    isDone: taskIsDone,
    user: req.user.id,
  });
  res.status(200).json({
    message: appMessage.task.success.created,
    task: newTask,
  });
});

const updateTask = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error(appMessage.task.error.enter_title);
  }

  const existTask = await Task.findById(req.params.taskId);
  if (!existTask) {
    res.status(400);
    throw new Error(appMessage.task.error.not_found);
  }

  const updatedTask = await Task.findByIdAndUpdate(
    req.params.taskId,
    req.body,
    { new: true }
  );
  res.status(200).json({
    message: appMessage.task.success.updated,
    task: updatedTask,
  });
});

const deleteTask = asyncHandler(async (req, res) => {
  const taskToDelete = await Task.findById(req.params.taskId);
  if (!taskToDelete) {
    res.status(400);
    throw new Error(appMessage.task.error.not_found);
  }

  await Task.findByIdAndDelete(req.params.taskId);
  res.status(200).json({
    message: appMessage.task.success.deleted.replace('id', req.params.taskId),
  });
});

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask };
