import { configureStore } from '@reduxjs/toolkit';
import questionReducer from './features/questionSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      questions: questionReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];