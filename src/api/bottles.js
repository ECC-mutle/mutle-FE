import axios from 'axios';

const API_BASE_URL = 'https://mutle-be.onrender.com';

const getCleanToken = (token) => {
  if (!token) return '';
  return token.replace(/[\s\t\n\r]/g, '').trim();
};

//유리병 보내기
export const SendBottle = async (token, bottleData) => {
  try {
    const cleanToken = getCleanToken(token);
    const response = await axios.post(
      `${API_BASE_URL}/api/bottles`,
      bottleData,
      {
        headers: { Authorization: `Bearer ${cleanToken}` },
      },
    );
    return response.data;
  } catch (error) {
    console.error('유리병 보내기 에러', error);
    throw error;
  }
};

//유리병 받기
export const GetBottle = async (token) => {
  try {
    const cleanToken = getCleanToken(token);

    const response = await axios.get(`${API_BASE_URL}/api/bottles/random`, {
      headers: { Authorization: `Bearer ${cleanToken}` },
    });
    return response.data;
  } catch (error) {
    console.error('유리병 받기 에러', error);
    throw error;
  }
};

//유리병 반응 남기기 -> 랜덤으로 유리병 받았을 때 하트 누르기!
export const ReactBottle = async (token, bottleId) => {
  try {
    const cleanToken = getCleanToken(token);
    const response = await axios.post(
      `${API_BASE_URL}/api/bottles/${bottleId}/reaction`,
      {},
      {
        headers: { Authorization: `Bearer ${cleanToken}` },
      },
    );
    return response.data;
  } catch (error) {
    console.error('유리병 반응 남기기 에러', error);
    throw error;
  }
};

//유리병 반응 조회
export const GetBottleReaction = async (token, bottleId) => {
  try {
    const cleanToken = getCleanToken(token);
    const response = await axios.get(
      `${API_BASE_URL}/api/bottles/${bottleId}/reaction`,
      {
        headers: { Authorization: `Bearer ${cleanToken}` },
      },
    );
    return response.data;
  } catch (error) {
    console.error('유리병 반응 조회 에러', error);
    throw error;
  }
};

//오늘의 질문 조회
export const GettodayQuest = async (token) => {
  try {
    const cleanToken = getCleanToken(token);
    const response = await axios.get(`${API_BASE_URL}/api/bottles/todayQuest`, {
      headers: {
        Authorization: `Bearer ${cleanToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('오늘의 질문 조회 에러', error);
    throw error;
  }
};

//유리병 북마크 추가
export const AddBookmark = async (token, bottleId) => {
  try {
    const cleanToken = getCleanToken(token);

    const response = await axios.post(
      `${API_BASE_URL}/api/bottles/${bottleId}/bookmark`,
      {},
      {
        headers: { Authorization: `Bearer ${cleanToken}` },
      },
    );
    return response.data;
  } catch (error) {
    console.error('유리병 북아크 추가 에러', error);
    throw error;
  }
};

//북마크 목록 조회
export const GetBookmarkList = async (token) => {
  try {
    const cleanToken = getCleanToken(token);

    const response = await axios.get(`${API_BASE_URL}/api/bottles/bookmarks`, {
      headers: { Authorization: `Bearer ${cleanToken}` },
    });
    return response.data;
  } catch (error) {
    console.error('북마크 목록 조회 에러', error);
    throw error;
  }
};

//유리병 상세 페이지
export const GetBottleDetail = async (token, bottleId) => {
  try {
    const cleanToken = getCleanToken(token);

    const response = await axios.get(
      `${API_BASE_URL}/api/bottles/${bottleId}`,
      {
        headers: { Authorization: `Bearer ${cleanToken}` },
      },
    );
    return response.data;
  } catch (error) {
    console.error('유리병 상세 조회 에러', error);
    throw error;
  }
};
