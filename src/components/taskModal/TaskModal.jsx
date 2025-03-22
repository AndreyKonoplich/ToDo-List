import React, { useState, useEffect } from 'react';
import { formatDate, calculateRemainingDays } from '@/utils/dateUtils';

import '@/styles/components/taskModal.scss';

const TaskModal = ({ task, onEdit, onDelete, onClose, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localEditedTask, setLocalEditedTask] = useState(task);
  const [remainingDays, setRemainingDays] = useState('');

  useEffect(() => {
    setRemainingDays(calculateRemainingDays(task?.totalTime));
  }, [task?.totalTime]);

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
              <span className="name">Окончательный срок:</span>
              <div className="task-modal-date-input-container">
                <input
                  type="date"
                  name="totalTime"
                  value={
                    localEditedTask.totalTime
                      ? localEditedTask.totalTime.slice(0, 10)
                      : ''
                  }
                  onChange={handleChange}
                  className="task-modal-edit-input"
                  placeholder="Общее время на задачу"
                />
              </div>
              <span className="name">Осталось:</span>
              <input
                type="text"
                name="remainingTime"
                value={remainingDays}
                className="task-modal-edit-input"
                readOnly
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
                <strong>Окончательный срок:</strong>{' '}
                {formatDate(task.totalTime)}
              </p>
              <p>
                <strong>Осталось:</strong> {remainingDays}
              </p>
              <div className="task-modal-actions">
                <button
                  onClick={() => setIsEditing(true)}
                  className="task-modal-edit-button"
                >
                  Редактировать
                </button>
                <button
                  onClick={() => onDelete(task)}
                  className="task-modal-delete-button"
                >
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
