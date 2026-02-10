import axios from 'axios';

const API_BASE_URL = 'https://mutle-be.onrender.com';

export const SearchMusic = async (keyword) => {
  try {
    const response = await axios.get('/api/music/search', {
      params: {
        keyword: keyword,
      },
    });
    return response.data;
  } catch (error) {
    console.error('에러 발생', error);
    throw error;
  }
};
