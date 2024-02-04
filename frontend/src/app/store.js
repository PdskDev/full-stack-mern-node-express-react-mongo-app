import authReducer from '../features/auth/authSlice';
import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../features/tasks/taskSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
  },
});
