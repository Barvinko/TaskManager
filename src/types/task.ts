export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  createdAt: string;
}

export type CreateTaskDto = Omit<Task, 'id' | 'createdAt'>;
export type UpdateTaskDto = Partial<CreateTaskDto>;
