import instance from '@/lib/axios';

const TASKS_PATH = '/tasks';

export const tasksApi = {
  getTasks: (taskListId, email) =>
    instance.get(`${TASKS_PATH}/get-tasks`, { params: { taskListId, email } }),

  addTask: (taskListId, email, task) =>
    instance.post(`${TASKS_PATH}/add-task`, { taskListId, email, task }),

  deleteTask: (taskListId, email, taskId) =>
    instance.delete(`${TASKS_PATH}/delete-task`, {
      data: { taskListId, email, taskId },
    }),
  updateTask: (taskListId, email, updatedTask) =>
    instance.put(`${TASKS_PATH}/update-task`, {
      taskListId,
      email,
      updatedTask,
    }),
};
