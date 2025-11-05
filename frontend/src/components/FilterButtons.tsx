import React from 'react';
import { FilterType, TaskStats } from '../types/task.types';

interface FilterButtonsProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  stats: TaskStats;
}

export const FilterButtons: React.FC<FilterButtonsProps> = ({
  currentFilter,
  onFilterChange,
  stats
}) => {
  const filters: { type: FilterType; label: string; count: number }[] = [
    { type: 'all', label: 'All', count: stats.total },
    { type: 'active', label: 'Active', count: stats.active },
    { type: 'completed', label: 'Completed', count: stats.completed }
  ];

  return (
    <div className="flex gap-2 mb-6 flex-wrap">
      {filters.map(({ type, label, count }) => (
        <button
          key={type}
          onClick={() => onFilterChange(type)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            currentFilter === type
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {label} ({count})
        </button>
      ))}
    </div>
  );
};