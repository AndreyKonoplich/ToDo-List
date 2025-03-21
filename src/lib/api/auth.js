import instance from '@/lib/axios';

const AUTH_PATH = '/auth';

export const authApi = {
  register: (body) => instance.post(`${AUTH_PATH}/signup`, body),
  login: (body) => instance.post(`${AUTH_PATH}/login`, body),
  logout: () => instance.post(`${AUTH_PATH}/logout`),
};
