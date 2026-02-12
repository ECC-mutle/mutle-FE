import axios from 'axios';

const API_BASE_URL = 'https://mutle-be.onrender.com';

//프로필 조회
export const GetProfile = async (userId, token, year, month) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/island/${userId}`, {
      params: { year, month },
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('프로필 조회 에러', error);
    throw error;
  }
};

//bio 수정(생성)
export const UpdateBio = async (bio, token) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/island/bio`,
      {
        bio: bio,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data;
  } catch (error) {
    console.error('bio 수정(생성) 에러', error);
    throw error;
  }
};

//대표곡 수정
export const UpdateRepMusic = async (musicData, token) => {
  try {
    const response = await axios.put(
      '/api/island/bio',
      {
        bio: bio,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data;
  } catch (error) {
    console.error('대표곡 수정 에러:', error);
    throw error;
  }
};

//대표곡 수정
export const UpdateRepMusic = async (musicData, token) => {
  try {
    const response = await axios.put('/api/island/rep-music', musicData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('대표곡 수정 에러:', error);
    throw error;
  }
};

//대표곡 삭제
export const DeleteRepMusic = async (token) => {
  try {
    const response = await axios.delete('/api/island/rep-music', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('대표곡 삭제 에러:', error);
    throw error;
  }
};

//플랫폼 수정(생성)
export const UpdatePlatform = async (platformsArray, token) => {
  try {
    const response = await axios.put(
      '/api/island/platforms',
      { platforms: platformsArray },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('대표곡 삭제 에러:', error);
    throw error;
  }
};

//플랫폼 수정(생성)
export const UpdatePlatform = async (platformsArray, token) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/island/platforms`,
      { platforms: platformsArray },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('플랫폼 수정 에러:', error);
    throw error;
  }
};
