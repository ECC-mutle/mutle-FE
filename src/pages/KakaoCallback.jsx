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

      if (res && res.status === 'success') {
        const { accessToken, refreshToken } = res.data;

        if (accessToken) {
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);

          // 알림창을 띄우기 전에 이미 저장되었는지 확인
          alert(`반갑습니다! 로그인에 성공했습니다.`);
          navigate('/bottles/bottles', { replace: true });
        }
      }
    } catch (error) {
      // 이미 성공해서 토큰이 있는 상태라면 에러 알림을 무시
      if (!localStorage.getItem('accessToken')) {
        console.error('로그인 에러:', error);
        alert('로그인 처리 중 오류가 발생했습니다.');
        navigate('/');
      }
    }
  };

  return <div>로그인 중입니다. 잠시만 기다려주세요...</div>;
};

export default KakaoCallback;
