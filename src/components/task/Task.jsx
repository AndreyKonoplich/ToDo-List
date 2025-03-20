import React, { useState } from 'react';
import TaskModal from '@/components/taskModal/TaskModal';

import '@/styles/components/task.scss';

const Task = ({ task, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = () => {
    onEdit(editedTask);
    setIsEditing(false);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="task">
      {isEditing ? (
        <>
          <span className="name">Название:</span>
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) =>
              setEditedTask({ ...editedTask, title: e.target.value })
            }
            className="edit-input"
          />
          <span className="status">Статус:</span>
          <select
            value={editedTask.status}
            onChange={(e) =>
              setEditedTask({ ...editedTask, status: e.target.value })
            }
            className="status-select"
          >
            <option value="Нужно сделать">Нужно сделать</option>
            <option value="В процессе">В процессе</option>
            <option value="Завершено">Завершено</option>
            <option value="Отложено">Отложено</option>
          </select>
          <div className="edit-buttons">
            <button onClick={handleSave} className="edit-button">
              Сохранить
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="delete-button"
            >
              Отмена
            </button>
          </div>
        </>
      ) : (
        <>
          <div onClick={handleModalOpen} className="task-content">
            <h4>{editedTask.title}</h4>
            <p>Статус: {editedTask.status}</p>
            <p>Общее время: {editedTask.totalTime}</p>
            <p>Осталось времени: {editedTask.remainingTime}</p>
          </div>

          <div className="task-actions">
            <button onClick={() => setIsEditing(true)} className="edit-button">
              Редактировать
            </button>
            <button onClick={onDelete} className="delete-button">
              Удалить
            </button>
          </div>
        </>
      )}

      {isModalOpen && (
        <TaskModal
          task={editedTask}
          onEdit={setEditedTask}
          onDelete={onDelete}
          onClose={handleModalClose}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Task;
