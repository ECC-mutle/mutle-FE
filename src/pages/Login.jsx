// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import Header from '../components/Header/Header';
import styled from '@emotion/styled';
import { Login } from '../api/auth';

export default function LoginPage() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1); //1일때는 이메일 입력창, 2일때는 비밀번호 입력창
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleNext = () => {
    if (!userId) return alert('아이디를 입력해주세요.');
    setStep(2);
  };

  const handleLogin = async () => {
    try {
      const result = await Login(userId, password);
      if (result) {
        localStorage.setItem('token', result.data.accessToken);
        setStep(3);
      }
    } catch (error) {
      console.error(error);
      setStep(4); // 실패 화면으로 이동
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
          <p>가입한 아이디를 입력해주세요</p>
          <Input
            type='text'
            value={userId}
            placeholder='아이디 입력'
            onChange={(e) => setUserId(e.target.value)}
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
          <p
            style={{
              fontSize: '1.2rem',
              marginBottom: '20px',
              color: '#4A90E2',
              fontWeight: 'bold',
            }}
          >
            로그인이 완료되었습니다!
          </p>
          <Button onClick={() => navigate('/bottles/bottles')}>시작하기</Button>
        </>
      )}
      {step === 4 && (
        <>
          {/* 로그인_4 화면 구성 (실패 안내) */}
          <>
            <p style={{ color: 'red', marginBottom: '20px' }}>
              로그인 정보가 일치하지 않습니다.
            </p>
            <Button onClick={() => setStep(1)}>다시 시도하기</Button>
          </>
        </>
      )}
    </div>
  );
}
