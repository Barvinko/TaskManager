import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Task } from '@/types';

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
    }),
    deleteTask: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tasks'],
    }),
    createTask: builder.mutation<Task, Partial<Task>>({
      query: (body) => ({
        url: '/tasks',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Tasks'],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTasksDetailQuery,
  useDeleteTaskMutation,
  useCreateTaskMutation,
} = taskApi;
