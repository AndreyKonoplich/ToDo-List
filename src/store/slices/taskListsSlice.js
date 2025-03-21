import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const taskListsSlice = createSlice({
  name: 'taskLists',
  initialState,
  reducers: {
    addTaskList: (state) => {
      const maxId = state.reduce(
        (max, list) => (list.id > max ? list.id : max),
        0
      );
      const newListId = maxId + 1;
      state.push({
        id: newListId,
        title: `Список ${newListId}`,
        isDeleted: false,
      });
    },

    deleteTaskList: (state, action) => {
      const { taskListId } = action.payload;
      const list = state.find((list) => list.id === taskListId);
      if (list) {
        list.isDeleted = true;
      }
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

export const { addTaskList, deleteTaskList, setTaskListTitle } =
  taskListsSlice.actions;

export default taskListsSlice.reducer;
