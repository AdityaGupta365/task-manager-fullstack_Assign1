export interface Task {
  id: number;
  description: string;
  isCompleted: boolean;
  createdAt: string;
}

export type FilterType = 'all' | 'active' | 'completed';

export interface TaskStats {
  total: number;
  active: number;
  completed: number;
}