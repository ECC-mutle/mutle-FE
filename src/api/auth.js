import axios from 'axios';

const API_BASE_URL = 'https://mutle-be.onrender.com';

export const signup = async (userData) => {
  try {
    const response = await axios.post(`/api/auth/signup`, {
      userId: userData.userId,
      nickname: userData.nickname,
      password: userData.password,
      email: userData.email,
      profileImage: userData.profileImage,
    });
    return response.data;
  } catch (error) {
    console.error('회원가입 실패:', error);
    throw error;
  }
};

export const login = async (userId, password) => {
  try {
    const response = await axios.post(`/api/auth/login`, {
      userId: userId,
      password: password,
    });

    // 성공 시 서버가 주는 accessToken과 refreshToken 등이 담긴 data를 반환.
    return response.data;
  } catch (error) {
    console.error('로그인 실패:', error);
    throw error;
  }
};

export const logout = async (token) => {
  try {
    const response = await axios.post(
      `/api/auth/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('로그아웃 실패:', error);
    throw error;
  }
};

export const withdraw = async (password, token) => {
  try {
    const response = await axios.delete(`/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        password: password,
      },
    });
    return response.data;
  } catch (error) {
    console.error('회원 탈퇴 실패:', error);
    throw error;
  }
};

export const updatePassword = async (currentPassword, newPassword, token) => {
  const response = await axios.put(
    `/api/auth/me/password`,
    {
      currentPassword: currentPassword,
      newPassword: newPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};
