// src/pages/Login/Login.jsx
import React from 'react';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import styled from '@emotion/styled';

const LoginWrapper = styled.div`
  width: 100%; /* 화면 너비 90% */
  max-width: 1276px; /* 최대 너비 */
  height: 100%;
  max-height: 782px; /* 최대 높이 */
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-sizing: border-box; /* padding 포함해서 크기 계산 */
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: #b2ebf2;
`;

const Login = () => {
  return (
    <LoginWrapper>
      <h2>회원가입 / 로그인</h2>
      <Input placeholder='이메일' />
      <Input placeholder='비밀번호' type='password' />
      <Input placeholder='비밀번호 확인' type='password' />
      <Button>가입하기</Button>
    </LoginWrapper>
  );
};

export default Login;
