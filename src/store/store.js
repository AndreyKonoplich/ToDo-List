import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '@/store/slices/tasksSlice';
import taskListsReducer from '@/store/slices/taskListsSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    taskLists: taskListsReducer,
  },
});
