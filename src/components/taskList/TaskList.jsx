'use client';

import React, { useState, useEffect, useRef } from 'react';
import Task from '@/components/task/Task';

import '@/styles/components/taskList.scss';

const TaskList = ({ title, onDelete, onEdit }) => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const editInputRef = useRef(null);

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [isEditing]);

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      const newTask = {
        id: Date.now(),
        title: newTaskTitle,
        description: '',
        status: 'В процессе',
        timeLeft: '2 часа',
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
    }
  };

  const handleEditTitle = () => {
    if (isEditing) {
      onEdit(editedTitle);
    }
    setIsEditing(!isEditing);
  };

  const handleSaveOnBlur = () => {
    if (isEditing) {
      onEdit(editedTitle);
      setIsEditing(false);
    }
  };

  const handleSaveOnEnter = (e) => {
    if (e.key === 'Enter') {
      onEdit(editedTitle);
      setIsEditing(false);
    }
  };

  return (
    <div className="task-list">
      <div className="list-header">
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleSaveOnBlur}
            onKeyDown={handleSaveOnEnter}
            ref={editInputRef}
            className="edit-input"
          />
        ) : (
          <h3>{editedTitle}</h3>
        )}
        <div className="list-actions">
          <button onClick={handleEditTitle} className="edit-button">
            <img src="/assets/icons/edit.svg" alt="Редактировать" />
          </button>
          <button onClick={onDelete} className="delete-button">
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
              const updatedTasks = tasks.map((t) =>
                t.id === updatedTask.id ? updatedTask : t
              );
              setTasks(updatedTasks);
            }}
            onDelete={() => {
              const updatedTasks = tasks.filter((t) => t.id !== task.id);
              setTasks(updatedTasks);
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
          placeholder="Добавить задачу"
        />
        <button onClick={handleAddTask}>+</button>
      </div>
    </div>
  );
};

export default TaskList;
