import axios from 'axios';

const TaskApi = {}

TaskApi.getTasks = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/tasks');
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

TaskApi.createTask = async (taskData) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/tasks', taskData);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

TaskApi.getTaskById = async (taskId) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching task by ID:', error);
    throw error;
  }
}

TaskApi.updateTask = async (taskId, updatedData) => {
  try {
    const response = await axios.put(`http://127.0.0.1:8000/api/tasks/${taskId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

TaskApi.deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/api/tasks/${taskId}`);
    console.log('Task deleted:', response);
    return response.data;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

export default TaskApi;