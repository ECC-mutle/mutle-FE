// src/pages/Onboarding.jsx
import React from 'react';
//import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
//import Header from '../components/Header/Header';
import { useNavigate, Link } from 'react-router-dom';
import styled from '@emotion/styled';

export default function OnboardingPage() {
  const navigate = useNavigate();

  const REST_API_KEY = '0d0a97f9482a11a9b73fedadd89ae9ff';
  const REDIRECT_URI = 'http://localhost:3000/kakao-callback'; // App.jsx에 설정한 경로
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const GOOGLE_CLIENT_ID =
    '923537062848-7cuupfs6nseihkq5q7t095nblvq6e8lc.apps.googleusercontent.com';
  const GOOGLE_REDIRECT_URI = 'http://localhost:3000/google-callback';
  const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile`;

  const handleGoogleLogin = () => {
    window.location.href = GOOGLE_AUTH_URL;
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // 세로 중앙 정렬
        alignItems: 'center', // 가로 중앙 정렬
        height: '100vh', // 화면 높이 전체 사용
        width: '100vw', // 화면 너비 전체 사용
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Mutle</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        <Button variant='primary' size='md' onClick={handleGoogleLogin}>
          google로 로그인
        </Button>
        <Button variant='primary' size='md' onClick={handleKakaoLogin}>
          카카오톡으로 로그인
        </Button>
        <Button variant='primary' size='md' onClick={() => navigate('/login')}>
          로그인하기
        </Button>
      </div>
      <p style={{ marginBottom: '40px', color: '#000000' }}>
        아직 계정이 없으신가요?{' '}
        <Link
          to='/signup'
          style={{
            marginBottom: '40px',
            color: '#000000',
            textDecoration: 'underline',
          }}
        >
          회원가입
        </Link>
      </p>
    </div>
  );
}
