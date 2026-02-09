import axios from 'axios';

const API_BASE_URL = 'https://mutle-be.onrender.com';

export const GetMenuInfo = async (token) => {
  try {
    const response = await axios.get('/api/manu', {
      Headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('메뉴 정보 불러오기 에러', error);
    throw error;
  }
};
