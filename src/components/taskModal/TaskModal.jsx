import React, { useState, useEffect } from 'react';

import '@/styles/components/taskModal.scss';

const TaskModal = ({ task, onEdit, onDelete, onClose, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localEditedTask, setLocalEditedTask] = useState(task);

  const handleSave = () => {
    onEdit(localEditedTask);
    onSave(localEditedTask);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setLocalEditedTask(task);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedTask = {
      ...localEditedTask,
      [name]: value,
    };
    setLocalEditedTask(updatedTask);
  };

  return (
    <div className="task-modal-overlay">
      <div className="task-modal">
        <div className="task-modal-header">
          <h3>Подробная информация о задаче</h3>
          <button onClick={onClose} className="task-modal-close-button">
            <img src="/assets/icons/cross.svg" alt="Закрыть" />
          </button>
        </div>
        <div className="task-modal-body">
          {isEditing ? (
            <>
              <span className="name">Название:</span>
              <input
                type="text"
                name="title"
                value={localEditedTask.title}
                onChange={handleChange}
                className="task-modal-edit-input"
              />
              <span className="name">Описание:</span>
              <textarea
                name="description"
                value={localEditedTask.description}
                onChange={handleChange}
                className="task-modal-edit-textarea"
              />
              <span className="name">Статус:</span>
              <select
                name="status"
                value={localEditedTask.status}
                onChange={handleChange}
                className="task-modal-status-select"
              >
                <option value="Нужно сделать">Нужно сделать</option>
                <option value="В процессе">В процессе</option>
                <option value="Завершено">Завершено</option>
                <option value="Отложено">Отложено</option>
              </select>
              <span className="name">Время на выполнение:</span>
              <input
                type="text"
                name="totalTime"
                value={localEditedTask.totalTime}
                onChange={handleChange}
                className="task-modal-edit-input"
                placeholder="Общее время на задачу"
              />
              <span className="name">Оставшееся время:</span>
              <input
                type="text"
                name="remainingTime"
                value={localEditedTask.remainingTime}
                onChange={handleChange}
                className="task-modal-edit-input"
                placeholder="Оставшееся время"
              />
              <div className="task-modal-edit-buttons">
                <button onClick={handleSave} className="task-modal-save-button">
                  Сохранить
                </button>
                <button
                  onClick={handleCancel}
                  className="task-modal-cancel-button"
                >
                  Отмена
                </button>
              </div>
            </>
          ) : (
            <>
              <p>
                <strong>Название:</strong> {task.title}
              </p>
              <p>
                <strong>Описание:</strong> {task.description}
              </p>
              <p>
                <strong>Статус:</strong> {task.status}
              </p>
              <p>
                <strong>Общее время:</strong> {task.totalTime}
              </p>
              <p>
                <strong>Осталось времени:</strong> {task.remainingTime}
              </p>
              <div className="task-modal-actions">
                <button
                  onClick={() => setIsEditing(true)}
                  className="task-modal-edit-button"
                >
                  Редактировать
                </button>
                <button onClick={onDelete} className="task-modal-delete-button">
                  Удалить
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
