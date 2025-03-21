import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  taskLists: {},
  editingTask: null,
  isModalOpen: false,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { taskListId, task } = action.payload;
      if (!state.taskLists[taskListId]) {
        state.taskLists[taskListId] = [];
      }
      state.taskLists[taskListId].push({
        ...task,
        id: uuidv4(),
      });
    },
    deleteTask: (state, action) => {
      const { taskListId, taskId } = action.payload;
      state.taskLists[taskListId] = state.taskLists[taskListId].filter(
        (task) => task.id !== taskId
      );
    },
    editTask: (state, action) => {
      const { taskListId, updatedTask } = action.payload;
      const tasks = state.taskLists[taskListId];
      const taskIndex = tasks.findIndex((task) => task.id === updatedTask.id);
      if (taskIndex !== -1) {
        tasks[taskIndex] = updatedTask;
      }
    },
    startEditingTask: (state, action) => {
      state.editingTask = action.payload;
    },
    stopEditingTask: (state) => {
      state.editingTask = null;
    },
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const {
  addTask,
  deleteTask,
  editTask,
  startEditingTask,
  stopEditingTask,
  openModal,
  closeModal,
} = tasksSlice.actions;

export default tasksSlice.reducer;
