import { configureStore } from '@reduxjs/toolkit';
import questionReducer from './features/questionSlice';
import authReducer from './features/authSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      questions: questionReducer,
      auth: authReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];