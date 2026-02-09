// src/pages/Onboarding.jsx
import React from 'react';
//import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
//import Header from '../components/Header/Header';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const OnboardingPage = () => {
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'colum',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        <Button variant='primary' size='md'>
          google로 로그인
        </Button>
        <Button variant='primary' size='md'>
          카카오톡으로 로그인
        </Button>
        <Button variant='primary' size='md'>
          로그인하기
        </Button>
      </div>
      <p style={{ marginBottom: '40px', color: '#000000' }}>
        아직 계정이 없으신가요?{' '}
        <Link to='/signup' style={{ marginBottom: '40px', color: '#000000' }}>
          회원가입
        </Link>
      </p>
    </div>
  );
};

export default OnboardingPage;
