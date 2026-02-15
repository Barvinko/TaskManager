import type { Task } from '@/types';

export const tasks: Task[] = [
  {
    id: '1',
    title: 'Setup project',
    description: 'Initialize Vite + React + TS project',
    status: 'done',
    createdAt: new Date('2024-01-15').toISOString(),
  },
  {
    id: '2',
    title: 'Configure RTK Query',
    description: 'Setup Redux store and API slice',
    status: 'in-progress',
    createdAt: new Date('2024-01-16').toISOString(),
  },
  {
    id: '3',
    title: 'Add tests',
    description: 'Write unit tests with Vitest',
    status: 'todo',
    createdAt: new Date('2024-01-17').toISOString(),
  },
];
