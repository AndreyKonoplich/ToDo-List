'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TaskList from '@/components/taskList/TaskList';
import AddTaskList from '@/components/addTaskList/AddTaskList';
import { addTaskList, setTaskLists } from '@/store/slices/taskListsSlice';
import { taskListsApi } from '@/lib/api/taskLists';
import { tasksApi } from '@/lib/api/tasks';

const TaskListsWrapper = () => {
  const dispatch = useDispatch();
  const taskLists = useSelector((state) => state.taskLists);
  const email = useSelector((state) => state.user.email);

  useEffect(() => {
    const fetchTaskLists = async () => {
      if (!email) return;
      try {
        const response = await taskListsApi.getTaskLists(email);
        dispatch(setTaskLists(response.data));

        response.data.forEach(async (list) => {
          const tasksResponse = await tasksApi.getTasks(list.id, email);
          dispatch({
            type: 'tasks/setTasks',
            payload: { taskListId: list.id, tasks: tasksResponse.data },
          });
        });
      } catch (error) {
        console.error('Ошибка при получении списков задач:', error);
      }
    };

    fetchTaskLists();
  }, [dispatch, email]);

  const handleAddTaskList = async () => {
    try {
      const newList = {
        title: `Новый список`,
        email,
      };

      const response = await taskListsApi.addTaskList(newList);
      dispatch(addTaskList(response.data));
    } catch (error) {
      console.error('Ошибка при добавлении списка задач:', error);
    }
  };

  return (
    <>
      {taskLists.map((list) => (
        <TaskList key={list.id} id={list.id} />
      ))}
      <AddTaskList onClick={handleAddTaskList} />
    </>
  );
};

export default TaskListsWrapper;
