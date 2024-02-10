import axios from 'axios';

const API_URL = '/api/tasks';

const createTask = async (taskData, token) => {
  const httpHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, taskData, httpHeaders);
  return response.data;
};

const getTasks = async (token) => {
  const httpHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, httpHeaders);

  return response.data;
};

const deleteTask = async (id, token) => {
  const httpHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + '/' + id, httpHeaders);

  return response.data;
};

const taskService = { createTask, getTasks, deleteTask };
export default taskService;
