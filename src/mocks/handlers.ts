import { http, HttpResponse } from 'msw';
import type { Task, CreateTaskDto } from '@/types';
import { tasks } from './mockData';

export const handlers = [
  http.get('/api/tasks', () => {
    return HttpResponse.json(tasks);
  }),
  http.get('/api/tasks/:id', ({ params }) => {
    const task = tasks.find((t) => t.id === params.id);
    if (!task) {
      return HttpResponse.json({ error: 'Task not found' }, { status: 404 });
    }
    return HttpResponse.json(task);
  }),
  http.delete('/api/tasks/:id', ({ params }) => {
    const index = tasks.findIndex((t) => t.id === params.id);
    if (index === -1) {
      return HttpResponse.json({ error: 'Task not found' }, { status: 404 });
    }
    tasks.splice(index, 1);
    return HttpResponse.json({ message: 'Task deleted' });
  }),
  http.post('/api/tasks', async ({ request }) => {
    const body = (await request.json()) as CreateTaskDto;
    const newTask: Task = {
      id: (tasks.length + 1).toString(),
      title: body.title,
      description: body.description,
      status: body.status,
      createdAt: new Date().toISOString(),
    };
    tasks.push(newTask);
    return HttpResponse.json(newTask, { status: 201 });
  }),
  http.put('/api/tasks/:id', async ({ params, request }) => {
    const body = (await request.json()) as Partial<CreateTaskDto>;
    const task = tasks.find((t) => t.id === params.id);
    if (!task) {
      return HttpResponse.json({ error: 'Task not found' }, { status: 404 });
    }
    Object.assign(task, body);
    return HttpResponse.json(task);
  }),
];
