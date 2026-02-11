import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '../api/auth'; // auth.js 파일 경로에 맞춰 수정하세요

export default function GoogleCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogin = async () => {
      // 1. URL에서 구글이 보내준 'code' 파라미터 추출
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');

      if (code) {
        try {
          // 2. auth.js에 정의된 GoogleLogin API 호출
          const data = await GoogleLogin(code);

          console.log('구글 로그인 성공:', data);

          // 3. 성공 시 토큰 저장 (예: localStorage)
          // 백엔드 응답 구조에 따라 data.accessToken 등으로 수정 필요
          localStorage.setItem('token', data.accessToken);

          // 4. 메인 페이지나 홈으로 이동
          navigate('/');
        } catch (error) {
          console.error('구글 로그인 처리 중 에러:', error);
          alert('로그인에 실패했습니다.');
          navigate('/login');
        }
      } else {
        console.error('인증 코드가 없습니다.');
        navigate('/login');
      }
    };

    handleLogin();
  }, [navigate]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <h2>구글 로그인 처리 중입니다...</h2>
    </div>
  );
}
