const getTasks = (req, res) => {
  res.status(200).json({
    message: 'Lecture de toutes les tâches',
  });
};

const getTaskById = (req, res) => {
  res.status(200).json({
    message: `The id of task is ${req.params.taskId}`,
  });
};

const createTask = (req, res) => {
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
