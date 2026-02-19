import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { KakaoLogin } from '../api/auth';

const KakaoCallback = () => {
  const navigate = useNavigate();
  const hasRequested = useRef(false);

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');

    // 이미 요청을 보냈거나 코드가 없으면 실행 안 함
    if (code && !hasRequested.current) {
      hasRequested.current = true; // 실행 표시
      sendCodeToBackend(code);
    }
  }, []);

  const sendCodeToBackend = async (code) => {
    try {
      const res = await KakaoLogin(code);

      console.log('카카오 응답:', res);

      // axios 전체 응답인지 아닌지 자동 대응
      const responseData = res.data ? res.data : res;

      if (responseData.status === 'success') {
        const { accessToken, refreshToken, userId, newUser } =
          responseData.data;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('userId', userId);

        console.log('토큰 저장 완료');

        navigate('/bottles/bottles', { replace: true });
      }
    } catch (error) {
      console.error('로그인 에러:', error);
      alert('로그인 처리 중 오류가 발생했습니다.');
      navigate('/');
    }
  };
};

export default KakaoCallback;
