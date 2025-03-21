'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TaskList from '@/components/taskList/TaskList';
import AddTaskList from '@/components/addTaskList/AddTaskList';
import { addTaskList } from '@/store/slices/taskListsSlice';

const TaskListsWrapper = ({ initialTaskLists }) => {
  const dispatch = useDispatch();
  const taskLists = useSelector((state) => state.taskLists);

  useEffect(() => {
    if (initialTaskLists && initialTaskLists.length > 0) {
      initialTaskLists.forEach((list) => {
        dispatch(
          addTaskList({
            id: list.id,
            title: `Список ${list.id}`,
            isDeleted: false,
          })
        );
      });
    }
  }, [initialTaskLists, dispatch]);

  const handleAddTaskList = () => {
    dispatch(addTaskList());
  };

  return (
    <>
      {taskLists
        .filter((list) => !list.isDeleted)
        .map((list) => (
          <TaskList key={list.id} id={list.id} />
        ))}
      <AddTaskList onClick={handleAddTaskList} />
    </>
  );
};

export default TaskListsWrapper;
