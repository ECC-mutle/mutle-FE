import axios from 'axios';

const API_BASE_URL = 'https://mutle-be.onrender.com';

export const updateRepMusic = async (musicData, token) => {
  //musicData : 보낼 음악 정보, token : 인증서
  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/island/rep-music`,
      musicData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('API 연동 실패:', error);
    throw error;
  }
};

export const deleteRepMusic = async (token) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/api/island/rep-music`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('삭제 실패:', error);
    throw error;
  }
};
