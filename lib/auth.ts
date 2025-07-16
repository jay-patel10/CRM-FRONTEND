import api from './api';

export const logoutUser = async () => {
  const token = localStorage.getItem('token');

  if (!token) throw new Error('No token found');

  return api.post('/auth/logout', null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
