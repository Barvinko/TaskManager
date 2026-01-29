import { http, HttpResponse } from 'msw';
import type { Task } from '@/types';

const tasks: Task[] = [
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

export const handlers = [
  http.get('/api/tasks', () => {
    return HttpResponse.json(tasks);
  }),
  http.get('/api/tasks/:id', ({ params }) => {
    const task = tasks.find(t => t.id === params.id);
    if (!task) {
      return HttpResponse.json({ error: 'Task not found' }, { status: 404 });
    }
    return HttpResponse.json(task);
  }),
];
