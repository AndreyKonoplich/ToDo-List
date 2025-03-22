import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    taskLists: {},
    editingTask: null,
  },
  reducers: {
    addTask: (state, action) => {
      const { taskListId, task } = action.payload;
      if (!state.taskLists[taskListId]) {
        state.taskLists[taskListId] = [];
      }
      state.taskLists[taskListId].push(task);
    },
    setTasks: (state, action) => {
      const { taskListId, tasks } = action.payload;
      state.taskLists[taskListId] = tasks;
    },
    deleteTask: (state, action) => {
      const { taskListId, taskId } = action.payload;
      state.taskLists[taskListId] = state.taskLists[taskListId].filter(
        (task) => task.id !== taskId
      );
    },
    editTask: (state, action) => {
      const { taskListId, updatedTask } = action.payload;
      const taskIndex = state.taskLists[taskListId].findIndex(
        (task) => task.id === updatedTask.id
      );
      if (taskIndex !== -1) {
        state.taskLists[taskListId][taskIndex] = updatedTask;
      }
    },
    startEditingTask: (state, action) => {
      state.editingTask = action.payload;
    },
    stopEditingTask: (state) => {
      state.editingTask = null;
    },
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.modalTaskId = action.payload;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.modalTaskId = null;
    },
  },
});

export const {
  addTask,
  setTasks,
  deleteTask,
  editTask,
  startEditingTask,
  stopEditingTask,
  openModal,
  closeModal,
} = tasksSlice.actions;
export default tasksSlice.reducer;
