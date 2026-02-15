import { configureStore } from '@reduxjs/toolkit';
import { taskApi } from '@/store/query/taskApi';

export type RootState = {
  [taskApi.reducerPath]: ReturnType<typeof taskApi.reducer>;
};

export const createTestStore = () => {
  return configureStore({
    reducer: { [taskApi.reducerPath]: taskApi.reducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(taskApi.middleware),
  });
};
