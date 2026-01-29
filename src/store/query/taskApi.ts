import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Task } from '@/types';

export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => '/tasks',
    }),
    getTasksDetail: builder.query<Task, string>({
      query: (id) => {
        if (!id) throw new Error('Task ID is required');
        return `/tasks/${id}`
      },
    }),
  }),
});

export const { useGetTasksQuery, useGetTasksDetailQuery } = taskApi;