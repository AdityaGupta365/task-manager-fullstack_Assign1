import React from 'react';
import { Trash2, CheckCircle2, Circle } from 'lucide-react';
import { Task } from '../types/task.types';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
      <button
        onClick={() => onToggle(task.id)}
        className="flex-shrink-0 text-gray-400 hover:text-indigo-600 transition-colors"
      >
        {task.isCompleted ? (
          <CheckCircle2 size={24} className="text-green-600" />
        ) : (
          <Circle size={24} />
        )}
      </button>
      
      <span
        className={`flex-1 ${
          task.isCompleted ? 'line-through text-gray-400' : 'text-gray-800'
        }`}
      >
        {task.description}
      </span>
      
      <button
        onClick={() => onDelete(task.id)}
        className="flex-shrink-0 text-gray-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
};