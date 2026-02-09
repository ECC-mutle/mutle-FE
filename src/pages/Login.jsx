// src/pages/Login.jsx
import React, { useState } from 'react';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import Header from '../components/Header/Header';
import styled from '@emotion/styled';

const LoginPage = () => {
  const [step, setStep] = useState(1); //1일때는 이메일 입력창, 2일때는 비밀번호 입력창
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 이메일 입력 후 다음으로
  const handleNext = () => {
    if (email.includes('@')) {
      setStep(2);
    } else {
      alert('올바른 이메일 주소를 입력하세요');
    }
  };

  // 로그인 시도 (API 역할)
  const handleLogin = () => {
    // 임시 로직: 이메일이 'test@test.com'이고 비번이 '1234'면 성공이라고 가정
    if (email === 'test@test.com' && password === '1234') {
      setStep(3); // 성공 -> 로그인_3
    } else {
      setStep(4); // 실패 -> 로그인_4 (오류 화면)
    }
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
      <h1 style={{ fontsize: '2.5rem', marginBottom: '20px' }}>Mutle</h1>

      {step === 1 && (
        <>
          <p>가입한 이메일 주소를 입력해주세요</p>
          <Input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button onClick={handleNext}>다음</Button>
        </>
      )}
      {step === 2 && (
        <>
          <p style={{ marginBottom: '40px', color: '#000000' }}>
            비밀번호를 입력해주세요
          </p>
          <Input
            type='password'
            placeholder='비밀번호 입력'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin} style={{ marginTop: '20px' }}>
            로그인
          </Button>
          <button
            onClick={() => setStep(1)}
            style={{
              marginTop: '10px',
              background: 'none',
              border: 'none',
              color: 'gray',
              cursor: 'pointer',
            }}
          >
            이전
          </button>
        </>
      )}

      {step === 3 && (
        <>
          {/* 로그인_3  */}
          <Button onClick={() => alert('가입 완료!')}>
            로그인이 완료되었습니다!
          </Button>
        </>
      )}
      {step === 4 && (
        <>
          {/* 로그인_4 화면 구성 (실패 안내) */}
          <Button onClick={() => setStep(2)}>
            로그인에 실패했습니다. 다시 시도해주세요
          </Button>
        </>
      )}
    </div>
  );
};

export default LoginPage;
