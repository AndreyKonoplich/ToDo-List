import instance from '@/lib/axios';

const TASK_LISTS_PATH = '/task-lists';

export const taskListsApi = {
  getTaskLists: (email) =>
    instance.get(`${TASK_LISTS_PATH}/get-task-lists`, { params: { email } }),

  addTaskList: (body) =>
    instance.post(`${TASK_LISTS_PATH}/add-task-list`, body),

  deleteTaskList: (taskListId, email) =>
    instance.delete(`${TASK_LISTS_PATH}/delete-task-list`, {
      data: { taskListId, email },
    }),

  updateTaskListTitle: (taskListId, email, title) =>
    instance.put(`${TASK_LISTS_PATH}/update-task-list`, {
      taskListId,
      email,
      title,
    }),
};
