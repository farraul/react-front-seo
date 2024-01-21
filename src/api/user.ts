import axios from 'axios';

export const getMe = async (token: string) => {
  return await axios({
    method: 'GET',
    url: '/user/profile',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
