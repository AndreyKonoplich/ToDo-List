import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TaskModal from '@/components/taskModal/TaskModal';
import {
  editTask,
  deleteTask,
  startEditingTask,
  stopEditingTask,
  openModal,
  closeModal,
} from '@/store/slices/tasksSlice';
import { tasksApi } from '@/lib/api/tasks';

import '@/styles/components/task.scss';

const formatDate = (date) => {
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
};

const Task = ({ taskId, taskListId }) => {
  const dispatch = useDispatch();
  const task = useSelector((state) =>
    state.tasks.taskLists[taskListId]?.find((t) => t.id === taskId)
  );
  const editingTask = useSelector((state) => state.tasks.editingTask);
  const isModalOpen = useSelector((state) => state.tasks.isModalOpen);
  const modalTaskId = useSelector((state) => state.tasks.modalTaskId);
  const isEditing = editingTask?.id === taskId;
  const isTaskModalOpen = isModalOpen && modalTaskId === taskId;
  const email = useSelector((state) => state.user.email);

  useEffect(() => {
    if (task) {
      dispatch(stopEditingTask());
    }
  }, [task, dispatch]);

  const handleSave = async (updatedTask) => {
    if (updatedTask) {
      try {
        await tasksApi.updateTask(taskListId, email, updatedTask);

        dispatch(editTask({ taskListId, updatedTask }));
        dispatch(stopEditingTask());
      } catch (error) {
        console.error('Ошибка при обновлении задачи:', error);
      }
    } else {
      console.error('Updated task is null');
    }
  };

  const handleModalOpen = () => {
    dispatch(openModal(taskId));
  };

  const handleModalClose = () => {
    dispatch(stopEditingTask());
    dispatch(closeModal());
  };

  const handleStartEditing = () => {
    dispatch(startEditingTask(task));
  };

  const handleDelete = async () => {
    try {
      await tasksApi.deleteTask(taskListId, email, taskId);
      dispatch(deleteTask({ taskListId, taskId }));
      dispatch(closeModal());
    } catch (error) {
      console.error('Ошибка при удалении задачи:', error);
    }
  };

  if (!task) {
    return null;
  }

  return (
    <div className="task">
      {isEditing ? (
        <>
          <span className="name">Название:</span>
          <input
            type="text"
            value={editingTask.title}
            onChange={(e) =>
              dispatch(
                startEditingTask({ ...editingTask, title: e.target.value })
              )
            }
            className="edit-input"
          />
          <span className="status">Статус:</span>
          <select
            value={editingTask.status}
            onChange={(e) =>
              dispatch(
                startEditingTask({ ...editingTask, status: e.target.value })
              )
            }
            className="status-select"
          >
            <option value="Нужно сделать">Нужно сделать</option>
            <option value="В процессе">В процессе</option>
            <option value="Завершено">Завершено</option>
            <option value="Отложено">Отложено</option>
          </select>
          <p className="deadline">Окончательный срок:</p>
          <input
            type="date"
            value={
              editingTask.totalTime ? editingTask.totalTime.slice(0, 10) : ''
            }
            onChange={(e) => {
              const updatedTask = {
                ...editingTask,
                totalTime: e.target.value || '',
              };
              dispatch(startEditingTask(updatedTask));
            }}
            className="deadline-input"
          />
          <div className="edit-buttons">
            <button
              onClick={() => handleSave(editingTask)}
              className="edit-button"
            >
              Сохранить
            </button>
            <button
              onClick={() => dispatch(stopEditingTask())}
              className="delete-button"
            >
              Отмена
            </button>
          </div>
        </>
      ) : (
        <>
          <div onClick={handleModalOpen} className="task-content">
            <h4>{task.title}</h4>
            <p>Статус: {task.status}</p>
            <p>
              Окончательный срок:{' '}
              {task.totalTime ? formatDate(task.totalTime) : 'Не указан'}
            </p>
          </div>

          <div className="task-actions">
            <button onClick={handleStartEditing} className="edit-button">
              Редактировать
            </button>
            <button onClick={handleDelete} className="delete-button">
              Удалить
            </button>
          </div>
        </>
      )}

      {isTaskModalOpen && (
        <TaskModal
          task={task}
          onEdit={(updatedTask) =>
            dispatch(editTask({ taskListId, updatedTask }))
          }
          onDelete={handleDelete}
          onClose={handleModalClose}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Task;
