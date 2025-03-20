'use client';

import React, { useState } from 'react';
import HeaderMenu from '@/components/headerMenu/HeaderMenu';
import TaskList from '@/components/taskList/TaskList';
import AddTaskList from '@/components/addTaskList/AddTaskList';

import '@/styles/pages/main.scss';

const MainPage = () => {
  const username = 'Иван Иванов';
  const [taskLists, setTaskLists] = useState([
    { id: 1, title: 'Найти репетитора' },
    { id: 2, title: 'Купить продукты' },
  ]);

  const handleAddTaskList = () => {
    const newTaskList = {
      id: Date.now(),
      title: `Новый список ${taskLists.length + 1}`,
    };
    setTaskLists([...taskLists, newTaskList]);
  };

  const handleDeleteTaskList = (id) => {
    setTaskLists(taskLists.filter((list) => list.id !== id));
  };

  const handleEditTaskList = (id, newTitle) => {
    setTaskLists(
      taskLists.map((list) =>
        list.id === id ? { ...list, title: newTitle } : list
      )
    );
  };

  return (
    <div className="main">
      <HeaderMenu username={username} />
      <div className="content-container">
        {taskLists.map((list) => (
          <TaskList
            key={list.id}
            title={list.title}
            onDelete={() => handleDeleteTaskList(list.id)}
            onEdit={(newTitle) => handleEditTaskList(list.id, newTitle)}
          />
        ))}
        <AddTaskList onClick={handleAddTaskList} />
      </div>
    </div>
  );
};

export default MainPage;
