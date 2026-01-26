import { configureStore } from '@reduxjs/toolkit';

const _empty = () => {};

export type RootState = {
  _empty: ReturnType<typeof _empty>;
};

interface CreateTestStoreOptions {
  _empty?: Partial<ReturnType<typeof _empty>>;
}

export const createTestStore = (preloadedState?: CreateTestStoreOptions) => {
  return configureStore({
    reducer: { _empty },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
    preloadedState: preloadedState ? preloadedState._empty : undefined,
  });
};
