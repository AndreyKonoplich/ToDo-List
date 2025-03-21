'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Task from '@/components/task/Task';
import { addTask } from '@/store/slices/tasksSlice';
import {
  setTaskListTitle,
  deleteTaskList,
} from '@/store/slices/taskListsSlice';
import { taskListsApi } from '@/lib/api/taskLists';
import '@/styles/components/taskList.scss';

const TaskList = ({ id }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.taskLists?.[id] || []);
  const taskList = useSelector((state) =>
    state.taskLists.find((list) => list.id === id)
  );
  const email = useSelector((state) => state.user.email);
  const title = taskList?.title || `Список`;
  const isDeleted = taskList?.isDeleted || false;
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [localTitle, setLocalTitle] = useState(title);
  const editInputRef = useRef(null);

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    setLocalTitle(title);
  }, [title]);

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      const newTask = {
        id: Date.now(),
        title: newTaskTitle,
        status: 'Нужно сделать',
        description: '',
        totalTime: 0,
        remainingTime: 0,
      };
      dispatch(addTask({ taskListId: id, task: newTask }));
      setNewTaskTitle('');
    }
  };

  const handleEditTitle = () => {
    setIsEditing(true);
  };

  const handleSaveTitle = async () => {
    try {
      await taskListsApi.updateTaskListTitle(id, email, localTitle);
      dispatch(setTaskListTitle({ taskListId: id, title: localTitle }));
      setIsEditing(false);
    } catch (error) {
      console.error('Ошибка при обновлении названия списка задач:', error);
    }
  };

  const handleSaveOnBlur = (e) => {
    if (
      !e.relatedTarget ||
      !e.relatedTarget.classList.contains('save-button')
    ) {
      handleSaveTitle();
    }
  };

  const handleSaveOnEnter = (e) => {
    if (e.key === 'Enter') {
      handleSaveTitle();
    }
  };

  const handleDeleteList = async () => {
    try {
      await taskListsApi.deleteTaskList(id, email);
      dispatch(deleteTaskList({ taskListId: id }));
    } catch (error) {
      console.error('Ошибка при удалении списка задач:', error);
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  if (isDeleted) return null;

  return (
    <div className="task-list">
      <div className="list-header">
        {isEditing ? (
          <input
            type="text"
            value={localTitle}
            onChange={(e) => setLocalTitle(e.target.value)}
            onBlur={handleSaveOnBlur}
            onKeyDown={handleSaveOnEnter}
            ref={editInputRef}
            className="edit-input"
          />
        ) : (
          <h3>{title}</h3>
        )}
        <div className="list-actions">
          {isEditing ? (
            <button onClick={handleSaveTitle} className="save-button">
              <img src="/assets/icons/accept.svg" alt="Сохранить" />
            </button>
          ) : (
            <button onClick={handleEditTitle} className="edit-button">
              <img src="/assets/icons/edit.svg" alt="Редактировать" />
            </button>
          )}
          <button onClick={handleDeleteList} className="delete-button">
            <img src="/assets/icons/cross.svg" alt="Удалить" />
          </button>
        </div>
      </div>
      <div className="tasks">
        {tasks.map((task) => (
          <Task key={task.id} taskId={task.id} taskListId={id} />
        ))}
      </div>
      <div className="add-task">
        <input
          className="input-task"
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder="Добавить задачу"
        />
        <button onClick={handleAddTask}>+</button>
      </div>
    </div>
  );
};

export default TaskList;
