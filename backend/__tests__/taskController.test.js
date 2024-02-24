const {
  getTasks,
  createTask,
  updateTask,
} = require('../controllers/taskController');
const Task = require('../models/taskModel');
const User = require('../models/userModel');

jest.mock('../models/taskModel');
jest.mock('../models/userModel');

test('should get tasks for a user', async () => {
  const req = { user: { id: 'user-id' } };

  //Mocking tasks for the user
  const tasks = [
    { _id: 'task-id-1', title: 'Learn Java 21', isDone: true, user: 'user-id' },
    { _id: 'task-id-2', title: 'Learn MAUI', isDone: false, user: 'user-id' },
    {
      _id: 'task-id-3',
      title: 'Learn Node.js',
      isDone: false,
      user: 'user-id',
    },
  ];

  //Mocking find method to return tasks for the user
  Task.find.mockResolvedValue(tasks);

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await getTasks(req, res);

  //Ensure that the response contains expected tasks
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(tasks);
});

test('should create a new task for user', async () => {
  const req = {
    user: { id: 'user-id' },
    body: { title: 'Learn .Net Core', isDone: false },
  };

  //Mocking the create method to return new task
  const newTask = {
    _id: 'task-id-1',
    title: 'Learn .Net Core',
    isDone: false,
    user: 'user-id',
  };

  const response = {
    message: 'Task created successfully',
    task: newTask,
  };

  Task.create.mockResolvedValue(newTask);

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await createTask(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(response);
});

test('should return a 400 error for missing title task', async () => {
  const req = {
    user: { id: 'user-id' },
    body: { isDone: false },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await expect(createTask(req, res)).rejects.toThrow('Please enter task title');
  expect(res.status).toHaveBeenCalledWith(400);
});

test('should return a 401 error if user is not found', async () => {
  const taskId = 'task-id-1';
  const userId = 'no-identique-user-id';
  const req = {
    params: { id: taskId },
    user: { id: userId },
    body: { title: 'Learn .Net Core 8', isDone: true },
  };

  //Mocking the create method to return new task
  const taskToUpdate = {
    _id: taskId,
    title: 'Learn .Net Core',
    isDone: false,
    user: 'user-id',
  };

  //Mocking find task
  Task.findById.mockResolvedValue(taskToUpdate);

  //Mocking find user that retun no user
  User.findById.mockResolvedValue(null);

  const errorMessage = 'No such user found';

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await expect(updateTask(req, res)).rejects.toThrow(errorMessage);
  expect(res.status).toHaveBeenCalledWith(401);
});

test('should return a 401 error if user is not authorized', async () => {
  const taskId = 'task-id-1';
  const userId = 'no-identique-user-id';
  const otherUserId = 'other-user-id-2';
  const req = {
    params: { id: taskId },
    user: { id: userId },
    body: { title: 'Learn .Net Core 8', isDone: true },
  };

  //Mocking the create method to return new task
  const taskToUpdate = {
    _id: taskId,
    title: 'Learn .Net Core',
    isDone: false,
    user: 'user-id',
  };

  //Mocking find task
  Task.findById.mockResolvedValue(taskToUpdate);

  //Mocking find user that retun no user
  User.findById.mockResolvedValue(otherUserId);

  const errorMessage = 'User is not authorized to update this task';

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await expect(updateTask(req, res)).rejects.toThrow(errorMessage);
  expect(res.status).toHaveBeenCalledWith(401);
});
