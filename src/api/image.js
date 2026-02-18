import axios from 'axios';

const api = axios.create({
  baseURL: '',
});

export const UploadImage = async (file) => {
  try {
    // FormData 객체 생성
    const formData = new FormData();
    // 명세서의 "file" key에 맞춰 파일 추가
    formData.append('file', file);

    // POST 요청 전송
    const response = await api.post(
      `${API_BASE_URL}/api/image/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    // API 응답 구조가 { "data": "이미지URL" } 형태라고 가정 => 이건 더 찾아보기
    return response.data;
  } catch (error) {
    console.error('이미지 업로드 실패:', error);
    throw error;
  }
};
