import React, { useState, useEffect } from 'react';

import '@/styles/components/taskModal.scss';

const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
};

const getRemainingDaysText = (remainingDays) => {
  if (remainingDays === 'Задача просрочена') return remainingDays;
  if (remainingDays === 1) return `${remainingDays} день`;
  if (remainingDays >= 2 && remainingDays <= 4) return `${remainingDays} дня`;
  return `${remainingDays} дней`;
};

const TaskModal = ({ task, onEdit, onDelete, onClose, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localEditedTask, setLocalEditedTask] = useState(task);
  const [remainingDays, setRemainingDays] = useState('');

  useEffect(() => {
    if (task?.totalTime) {
      const totalTime = new Date(task.totalTime);
      if (isNaN(totalTime.getTime())) {
        setRemainingDays('');
      } else {
        const today = new Date();
        const diffTime = totalTime - today;
        const diffDays = Math.floor(diffTime / (1000 * 3600 * 24));
        setRemainingDays(
          diffDays > 0 ? getRemainingDaysText(diffDays) : 'Задача просрочена'
        );
      }
    } else {
      setRemainingDays('');
    }
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
