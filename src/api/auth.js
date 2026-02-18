import axios from 'axios';

const api = axios.create({
  baseURL: '',
});

const API_BASE_URL = 'https://mutle-be.onrender.com';

//회원가입 (수정 완)
export const Signup = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/signup`, {
      userId: userData.userId,
      nickname: userData.nickname,
      password: userData.password,
      email: userData.email,
      profileImage: userData.profileImage || '',
    });

    console.log('서버 응답 데이터:', response.data);
    return response.data; //여기에 결과가 담김.
  } catch (error) {
    console.error('회원가입 실패:', error);
    throw error;
  }
};

//로그인
export const Login = async (userId, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
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

//로그아웃
export const Logout = async (token) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/logout`,
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

//탈퇴
export const Withdraw = async (password, token) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/auth/me`, {
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

//비밀번호 수정
export const UpdatePassword = async (currentPassword, newPassword, token) => {
  const response = await axios.put(
    `${API_BASE_URL}/api/auth/me/password`,
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

//정보 확인
export const GetMyInfo = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('내 정보 불러오기 실패:', error);
    throw error;
  }
};

//정보 수정
/**
 * 내 정보 수정 (PATCH /api/auth/me)
 * @param {Object} updateData - 수정할 데이터 (userId, nickname, email, profileImage)
 * @param {string} token - 인증 토큰
 */
export const UpdateMyInfo = async (updateData, token) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/api/auth/me`,
      {
        userId: updateData.userId,
        nickname: updateData.nickname,
        email: updateData.email,
        profileImage: updateData.profileImage,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      '정보 수정 중 에러 발생:',
      error.response?.data || error.message,
    );
    throw error;
  }
};

//아이디 중복 확인
export const CheckIdDuplicate = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/auth/check-user-id`, {
      params: {
        userId: userId,
      },
    });
    return response.data;
  } catch (error) {
    console.error('아이디 중복 확인 중 오류 발생', error);
    throw error;
  }
};

//이메일 중복 확인
export const CheckEmailDuplicate = async (email) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/auth/check-email`, {
      params: {
        email: email,
      },
    });
    return response.data.isDuplicate;
  } catch (error) {
    console.error('이메일 중복 확인 중 오류 발생', error);
    throw error;
  }
};

//카카오 가입/로그인
export const KakaoLogin = async (code) => {
  try {
    const response = await axios.post(
      'https://mutle-be.onrender.com/api/auth/kakao',
      {
        code: code,
      },
    );
    return response.data;
  } catch (error) {
    console.error('카카오 API 통신 에러', error);
    throw error;
  }
};

//구글 가입/로그인
export const GoogleLogin = async (authcode) => {
  try {
    const response = await axios.post(
      'https://mutle-be.onrender.com/api/auth/google',
      {
        code: authcode,
      },
    );
    return response.data;
  } catch (error) {
    console.error('구글 API 오류 발생', error);
    throw error;
  }
};
