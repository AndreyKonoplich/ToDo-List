'use client';

import React, { useState, useEffect, useRef } from 'react';
import Task from '@/components/task/Task';

import '@/styles/components/taskList.scss';

const TaskList = ({ id }) => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(`Список ${id}`);
  const [isDeleted, setIsDeleted] = useState(false);
  const editInputRef = useRef(null);

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [isEditing]);

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      setTasks([...tasks, { id: Date.now(), title: newTaskTitle }]);
      setNewTaskTitle('');
    }
  };

  const handleEditTitle = () => {
    setIsEditing(true); // Открываем инпут для редактирования
  };

  const handleSaveTitle = () => {
    setIsEditing(false); // Сохраняем и закрываем инпут
  };

  const handleSaveOnBlur = (e) => {
    // Проверяем, связан ли blur с кликом на кнопку "Сохранить"
    if (
      !e.relatedTarget ||
      !e.relatedTarget.classList.contains('save-button')
    ) {
      setIsEditing(false); // Закрываем инпут только если blur не вызван кнопкой "Сохранить"
    }
  };

  const handleSaveOnEnter = (e) => {
    if (e.key === 'Enter') {
      setIsEditing(false); // Закрываем инпут при нажатии Enter
    }
  };

  const handleDeleteList = () => {
    setIsDeleted(true);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddTask(); // Добавляем задачу при нажатии Enter
    }
  };

  if (isDeleted) return null;

  return (
    <div className="task-list">
      <div className="list-header">
        {isEditing ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
          <Task
            key={task.id}
            task={task}
            onEdit={(updatedTask) => {
              setTasks(
                tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
              );
            }}
            onDelete={() => {
              setTasks(tasks.filter((t) => t.id !== task.id));
            }}
          />
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
