import axios from 'axios';

const API_BASE_URL = 'https://mutle-be.onrender.com';

//친구 이메일/id 검색
//@param {object} params - { type(필수), email, userId }
export const SearchFriends = async (token, searchParams) => {
  try {
    const response = await axios.get('/api/friends/search', {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        type: searchParams.type,
        email: searchParams.email,
        userId: searchParams.userId,
      },
    });
    return response.data;
  } catch (error) {
    console.error('친구 검색 에러', error);
    throw error;
  }
};

//친구 신청 보내기
//@param {number} targetId - 상대방 유저 ID
export const RequestFriend = async (token, targetId) => {
  try {
    const response = await axios.post('/api/friends/request', {
      targetId: targetId,
      Headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('친구 신청 에러', error);
    throw error;
  }
};

//친구 신청 취소
//@param {number} requestId - 취소할 요청의 ID
export const CancelFriendRequest = async (token, requestId) => {
  try {
    const response = await axios.delete(`/api/friends/requests/${requestId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('친구 신청 취소 실패', error);
    throw error;
  }
};

//받은 친구 신청 목록 조회
export const GetRecivedRequests = async (token) => {
  try {
    const response = await axios.get('/api/friends/requests/received', {
      Headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('받은 신구 신청 목록 조회 실패 ', error);
    throw error;
  }
};

//친구 신청 수락/거절
//@param {number} requestId - 받은 요청의 ID
//@param {string} status - 'ACCEPTED' 또는 'REJECTED' 등
export const HandleFriendRequest = async (token, requestId, status) => {
  try {
    const response = await axios.patch(
      `/api/friends/requests/${requestId}`,
      { friendshipStatus: status },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return response.data;
  } catch (error) {
    console.error('친구 신청 수락/거절 실패 ', error);
    throw error;
  }
};

//친구 목록 조회
export const GetFriendList = async (token) => {
  try {
    const response = await axios.get('/api/friends', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('친구 목록 조회 실패 ', error);
    throw error;
  }
};

//친구 삭제
export const DelteFriend = async (token, requestId) => {
  try {
    const response = await axios.delete(`/api/friends/requests/${requestId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('친구 삭제 실패 ', error);
    throw error;
  }
};
