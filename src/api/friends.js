import axios from 'axios';

const API_BASE_URL = 'https://mutle-be.onrender.com';

export const getFriends = async (token) => {
  const res = await axios.get(`${API_BASE_URL}/api/friends`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data;
};
