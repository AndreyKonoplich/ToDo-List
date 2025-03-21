'use client';

import React from 'react';
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

import '@/styles/components/task.scss';

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

  if (!task) {
    return null;
  }

  const handleSave = (updatedTask) => {
    if (updatedTask) {
      dispatch(editTask({ taskListId, updatedTask }));
      dispatch(stopEditingTask());
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
            <p>Общее время: {task.totalTime}</p>
            <p>Осталось времени: {task.remainingTime}</p>
          </div>

          <div className="task-actions">
            <button onClick={handleStartEditing} className="edit-button">
              Редактировать
            </button>
            <button
              onClick={() =>
                dispatch(deleteTask({ taskListId, taskId: task.id }))
              }
              className="delete-button"
            >
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
          onDelete={() => dispatch(deleteTask({ taskListId, taskId: task.id }))}
          onClose={handleModalClose}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Task;
