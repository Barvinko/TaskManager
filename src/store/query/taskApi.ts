import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Task, CreateTaskDto, UpdateTaskDto } from '@/types';

export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Tasks'],
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => '/tasks',
      providesTags: ['Tasks'],
    }),
    getTasksDetail: builder.query<Task, string>({
      query: (id) => {
        if (!id) throw new Error('Task ID is required');
        return `/tasks/${id}`;
      },
      providesTags: (_result, _error, id) => [{ type: 'Tasks', id }],
    }),
    deleteTask: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tasks', { type: 'Tasks', id: 'LIST' }],
    }),
    createTask: builder.mutation<Task, CreateTaskDto>({
      query: (body) => ({
        url: '/tasks',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Tasks'],
    }),
    updateTask: builder.mutation<Task, { id: string; body: UpdateTaskDto }>({
      query: ({ id, body }) => ({
        url: `/tasks/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Tasks', id },
        'Tasks',
      ],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTasksDetailQuery,
  useDeleteTaskMutation,
  useCreateTaskMutation,
  useUpdateTaskMutation,
} = taskApi;
