'use client';

import React, { useState } from 'react';
import TaskList from '@/components/taskList/TaskList';
import AddTaskList from '@/components/addTaskList/AddTaskList';

const TaskListsWrapper = ({ initialTaskLists }) => {
  const [taskLists, setTaskLists] = useState(initialTaskLists);

  const handleAddTaskList = () => {
    const maxId = taskLists.reduce(
      (max, list) => (list.id > max ? list.id : max),
      0
    );
    const newListId = maxId + 1;
    setTaskLists([...taskLists, { id: newListId }]);
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
