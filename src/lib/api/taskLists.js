import instance from '@/lib/axios';

const TASK_LISTS_PATH = '/task-lists';

export const taskListsApi = {
  getTaskLists: (email) =>
    instance.get(`${TASK_LISTS_PATH}/get-task-lists`, { params: { email } }),
};
