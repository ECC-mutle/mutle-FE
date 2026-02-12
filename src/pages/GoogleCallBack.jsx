import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '../api/auth';

export default function GoogleCallback() {
  const navigate = useNavigate();
  const hasCalled = useRef(false); //실행 방지 플래그 (useEffect가 두번 실행되는 거 막는거임{카카오랑 같은 로직})

  useEffect(() => {
    // iseEffect 이미 실행 중이라면 여기서 중단
    if (hasCalled.current) return;

    const handleLogin = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');

      if (code) {
        // 실행 시작 시 true로 변경하여 중복 방지
        hasCalled.current = true;

        try {
          const response = await GoogleLogin(code);
          console.log('구글 로그인 성공:', response);

          // 3. 토큰 저장 (백엔드 응답 구조에 맞춰 data.accessToken 또는 response.data.accessToken 등 확인)
          // 보통 response.data 안에 토큰이 들어오는 경우가 많습니다.
          const token =
            response.accessToken ||
            (response.data && response.data.accessToken);

          if (token) {
            localStorage.setItem('token', token);
            alert('반갑습니다!');
            navigate('/bottles/bottles');
          } else {
            console.warn(
              '응답에서 토큰을 찾을 수 없습니다. 응답 구조를 확인하세요.',
            );
            navigate('/');
          }
        } catch (error) {
          console.error('구글 로그인 처리 중 에러:', error);
          alert('로그인에 실패했습니다.');
          navigate('/');
        }
      } else {
        console.error('인증 코드가 없습니다.');
        navigate('/');
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
