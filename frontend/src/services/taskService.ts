import axios from 'axios';
import { Task } from '../types/task.types';

const API_URL = 'http://localhost:5000/api/tasks';
// const API_URL = 'https://task-manager-fullstack-assign1.onrender.com/api/tasks';

export const taskService = {
  async getAllTasks(): Promise<Task[]> {
    try {
      const response = await axios.get<Task[]>(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  async createTask(description: string): Promise<Task> {
    try {
      const response = await axios.post<Task>(API_URL, { description });
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  async updateTask(id: number, updates: { description?: string; isCompleted?: boolean }): Promise<Task> {
    try {
      const response = await axios.put<Task>(`${API_URL}/${id}`, updates);
      return response.data;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  async deleteTask(id: number): Promise<void> {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
};