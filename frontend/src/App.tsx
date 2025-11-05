import React, { useState } from 'react';
import { FilterType } from './types/task.types';
import { useTasks } from './hooks/useTasks';
import { AddTask } from './components/AddTask';
import { FilterButtons } from './components/FilterButtons';
import { TaskList } from './components/TaskList';

function App() {
  const [filter, setFilter] = useState<FilterType>('all');
  const {
    loading,
    addTask,
    toggleTask,
    deleteTask,
    getFilteredTasks,
    getStats
  } = useTasks();

  const filteredTasks = getFilteredTasks(filter);
  const stats = getStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Task Manager
            </h1>
            <p className="text-gray-600">Stay organized and productive</p>
          </div>

          <AddTask onAdd={addTask} />
          
          <FilterButtons
            currentFilter={filter}
            onFilterChange={setFilter}
            stats={stats}
          />

          <TaskList
            tasks={filteredTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            loading={loading}
          />

          {stats.total > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex justify-between text-sm text-gray-600">
                <span>
                  {stats.active} active task{stats.active !== 1 ? 's' : ''}
                </span>
                <span>{stats.completed} completed</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;