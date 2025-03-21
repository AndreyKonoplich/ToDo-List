import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '@/store/slices/tasksSlice';
import taskListsReducer from '@/store/slices/taskListsSlice';
import userReducer from '@/store/slices/userSlice';

const initializeUser = () => {
  if (typeof window !== 'undefined') {
    const email = localStorage.getItem('email');
    if (email) {
      return { email, isAuthenticated: true };
    }
  }
  return { email: null, isAuthenticated: false };
};

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    taskLists: taskListsReducer,
    user: userReducer,
  },
  preloadedState: {
    user: initializeUser(),
  },
});
