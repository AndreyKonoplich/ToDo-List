import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const taskListsSlice = createSlice({
  name: 'taskLists',
  initialState,
  reducers: {
    setTaskLists: (state, action) => {
      return action.payload;
    },
    addTaskList: (state, action) => {
      state.push(action.payload);
    },
    deleteTaskList: (state, action) => {
      const { taskListId } = action.payload;
      return state.filter((list) => list.id !== taskListId);
    },
    setTaskListTitle: (state, action) => {
      const { taskListId, title } = action.payload;
      const list = state.find((list) => list.id === taskListId);
      if (list) {
        list.title = title;
      }
    },
  },
});

export const { setTaskLists, addTaskList, deleteTaskList, setTaskListTitle } =
  taskListsSlice.actions;
export default taskListsSlice.reducer;
