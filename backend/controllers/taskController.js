const tasks = [
  {
    id: 5,
    title: 'Learn Java',
    isDone: true,
  },
  {
    id: 6,
    title: 'Learn PHP',
    isDone: false,
  },
  {
    id: 7,
    title: 'Visit Paris',
    isDone: true,
  },
  {
    id: 8,
    title: 'Attend team meeting',
    isDone: false,
  },
  {
    id: 9,
    title: 'Delivery my app via Jenkins',
    isDone: true,
  },
];

const getTasks = (req, res) => {
  res.status(200).json({
    message: 'list of tasks',
    tasks: tasks,
  });
};

const getTaskById = (req, res) => {
  res.status(200).json({
    message: `The id of task is ${req.params.taskId}`,
  });
};

const createTask = (req, res) => {
  console.log(req.body);

  if (!req.body.title) {
    res.status(400);
    throw new Error('Please enter task title');
  }
  res.status(200).json({
    message: `Task is created with id ${Math.floor(Math.random() * 99) + 1}`,
  });
};

const updateTask = (req, res) => {
  res.status(200).json({
    message: `Task ${req.params.taskId} is updated successfully`,
  });
};

const deleteTask = (req, res) => {
  res.status(200).json({
    message: `Task ${req.params.taskId} is deleted successfully`,
  });
};

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask };
