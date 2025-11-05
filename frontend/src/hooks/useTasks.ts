import { useState, useEffect } from 'react';
import { Task, FilterType, TaskStats } from '../types/task.types';
import { taskService } from '../services/taskService';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      fetchTasks();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.getAllTasks();
      setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (description: string) => {
    const tempTask: Task = {
      id: Date.now(),
      description,
      isCompleted: false,
      createdAt: new Date().toISOString()
    };

    try {
      const newTask = await taskService.createTask(description);
      setTasks([...tasks, newTask]);
    } catch (err) {
      setTasks([...tasks, tempTask]);
    }
  };

  const toggleTask = async (id: number) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const updatedTask = { ...task, isCompleted: !task.isCompleted };

    try {
      await taskService.updateTask(id, { isCompleted: !task.isCompleted });
      setTasks(tasks.map(t => t.id === id ? updatedTask : t));
    } catch (err) {
      setTasks(tasks.map(t => t.id === id ? updatedTask : t));
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await taskService.deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      setTasks(tasks.filter(t => t.id !== id));
    }
  };

  const getFilteredTasks = (filter: FilterType): Task[] => {
    switch (filter) {
      case 'active':
        return tasks.filter(t => !t.isCompleted);
      case 'completed':
        return tasks.filter(t => t.isCompleted);
      default:
        return tasks;
    }
  };

  const getStats = (): TaskStats => ({
    total: tasks.length,
    active: tasks.filter(t => !t.isCompleted).length,
    completed: tasks.filter(t => t.isCompleted).length
  });

  return {
    tasks,
    loading,
    addTask,
    toggleTask,
    deleteTask,
    getFilteredTasks,
    getStats
  };
};