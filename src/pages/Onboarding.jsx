// src/pages/Onboarding.jsx
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import LogoImage from '../assets/images/Logo.png';
import styled from '@emotion/styled';

const LoginCard = styled.div`
  width: 90%;
  max-width: 1000px;
  height: 600px;
  background-color: #b2ebf2b1; //피그마와 다르게 비침.
  border-radius: 20px;
  border: 1px solid #000000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 40px;
`;

const Logo = styled.img`
  width: 600px; /* 원하는 너비 */
  height: auto; /* 비율 유지 */
  margin-bottom: 50px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 400px;
`;

const SocialButtons = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

const BaseButton = styled.button`
  border: none;
  border-radius: 25px;
  height: 50px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const GoogleButton = styled(BaseButton)`
  background-color: white;
  color: #333;
  flex: 1;
`;

const KakaoLoginButton = () => {
  return (
    <a href={KAKAO_AUTH_URL} style={{ display: 'inline-block' }}>
      <img src='/kakao_login_medium_narrow.png' alt='카카오 로그인' />
    </a>
  );
};

const MainLoginButton = styled.button`
  border: none;
  border-radius: 35px;
  height: 70px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
  background-color: black;
  color: white;
  width: 100%;
  font-size: 18px;
`;

const SignupText = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: #333;

  span {
    text-decoration: underline;
    cursor: pointer;
    margin-left: 10px;
  }
`;

export default function OnboardingPage() {
  const navigate = useNavigate();
  const BASE_URL = window.location.origin;

  const REST_API_KEY = '0d0a97f9482a11a9b73fedadd89ae9ff';
  const REDIRECT_URI = `${BASE_URL}/kakao-callback`; // App.jsx에 설정한 경로
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const GOOGLE_CLIENT_ID =
    '923537062848-7cuupfs6nseihkq5q7t095nblvq6e8lc.apps.googleusercontent.com';
  const GOOGLE_REDIRECT_URI = `${BASE_URL}/google-callback`;
  const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile`;

  const handleGoogleLogin = () => {
    window.location.href = GOOGLE_AUTH_URL;
  };

  return (
    <LoginCard>
      <Logo src={LogoImage} alt='Mutle Logo' />

      <ButtonGroup>
        <SocialButtons>
          <GoogleButton onClick={handleGoogleLogin}>
            Google로 로그인
          </GoogleButton>
          <KakaoLoginButton onClick={handleKakaoLogin}>
            카카오톡으로 로그인
          </KakaoLoginButton>
        </SocialButtons>

        <MainLoginButton onClick={() => navigate('/login')}>
          로그인하기
        </MainLoginButton>
      </ButtonGroup>

      <SignupText>
        아직 계정이 없으신가요?
        <Link to='/signup'> 회원가입</Link>
      </SignupText>
    </LoginCard>
  );
}
