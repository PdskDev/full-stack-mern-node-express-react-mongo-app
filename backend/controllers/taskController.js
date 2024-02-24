const asyncHandler = require('express-async-handler');
const Task = require('../models/taskModel');
const User = require('../models/userModel');
const appMessage = require('../messages/appMessage');

const getTasks = asyncHandler(async (req, res) => {
  //retreive only user's tasks
  const tasks = await Task.find({ user: req.user.id });
  res.status(200).json(tasks);
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

  const taskToUpdate = await Task.findById(req.params.taskId);
  if (!taskToUpdate) {
    res.status(400);
    throw new Error(appMessage.task.error.not_found);
  }

  const currentUser = await User.findById(req.user.id);

  if (!currentUser) {
    res.status(401);
    throw new Error(appMessage.user.error.user_not_found);
  }

  if (taskToUpdate.user.toString() != currentUser.id) {
    res.status(401);
    throw new Error(
      appMessage.task.error.not_authorized_action.replace('action', 'update')
    );
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

  const currentUser = await User.findById(req.user.id);

  if (!currentUser) {
    res.status(400);
    throw new Error(appMessage.user.error.user_not_found);
  }

  if (taskToDelete.user.toString() != currentUser.id) {
    res.status(400);
    throw new Error(
      appMessage.task.error.not_authorized_action.replace('action', 'delete')
    );
  }

  await Task.findByIdAndDelete(req.params.taskId);
  res.status(200).json({
    id: req.params.taskId,
    message: appMessage.task.success.deleted.replace('id', req.params.taskId),
  });
});

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask };
