import instance from '@/lib/axios';

const USER_PATH = '/user';

export const userApi = {
  getName: (email) => instance.get(`${USER_PATH}/get-user-name`, email),
};
