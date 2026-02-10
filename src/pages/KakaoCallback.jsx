import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { KakaoLogin } from '../api/auth';

const KakaoCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 1. 브라우저 주소창의 쿼리 스트링에서 'code' 값만 추출
    const code = new URL(window.location.href).searchParams.get('code');

    if (code) {
      sendCodeToBackend(code);
    }
  }, []);

  const sendCodeToBackend = async (code) => {
    try {
      // 2. 백엔드 API 호출 (명세서대로 { code: "string" } 전송)
      const response = await KakaoLogin(code);

      // 3. 성공 시 응답 데이터(accessToken 등) 처리
      // 명세서 구조상 response.data 안에 토큰들이 들어있음
      const { accessToken, refreshToken, userId } = response.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      alert(`반갑습니다, ${userId}님!`);
      navigate('/'); // 메인으로 이동
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인 중 오류가 발생했습니다.');
      navigate('/login');
    }
  };

  return <div>로그인 중입니다. 잠시만 기다려주세요...</div>;
};

export default KakaoCallback;
