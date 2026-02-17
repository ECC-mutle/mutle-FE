// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import styled from '@emotion/styled';
import { Login } from '../api/auth';
import LogoImage from '../assets/images/Logo.png';

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
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding-top: 80px;
`;

const Logo = styled.img`
  width: 600px; /* 원하는 너비 */
  height: auto; /* 비율 유지 */
  margin-bottom: 50px;
`;

const InstructionText = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 30px;
`;

const InputField = styled.input`
  width: 100%;
  max-width: 450px;
  height: 60px;
  border-radius: 30px;
  border: 1px solid #455a64; // 이미지 속 입력창 테두리 색상 느낌
  background-color: rgba(255, 255, 255, 0.4); // 약간 투명한 느낌
  padding: 0 30px;
  font-size: 16px;
  color: #333;
  outline: none;
  text-align: center; // 중앙 정렬
  margin-bottom: 20px;

  &::placeholder {
    color: #78909c; // 플레이스홀더 색상
  }

  &:focus {
    border: 2px solid #000;
    background-color: white;
  }
`;

const BaseButton = styled.button`
  border: none;
  border-radius: 25px;
  height: 25px;
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

export default function LoginPage() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1); //1일때는 아이디 입력창, 2일때는 비밀번호 입력창
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
        localStorage.setItem('userId', result.data.userId);
        console.log('결과값:', result);
        setStep(3);
      }
    } catch (error) {
      console.error(error);
      setStep(4); // 실패 화면으로 이동
    }
  };

  return (
    <LoginCard>
      <Logo src={LogoImage} alt='Mutle Logo' />

      {step === 1 && (
        <>
          <InstructionText>가입한 아이디를 입력해주세요.</InstructionText>
          <InputField
            type='text'
            value={userId}
            placeholder='아이디 입력'
            onChange={(e) => setUserId(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleNext()}
          />
          <BaseButton onClick={handleNext}>다음</BaseButton>
        </>
      )}
      {step === 2 && (
        <>
          <InstructionText>비밀번호를 입력해주세요.</InstructionText>
          <InputField
            type='password'
            value={password}
            placeholder='비밀번호 입력'
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />
          <BaseButton onClick={handleLogin}>로그인</BaseButton>
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
              color: '#000000',
              fontWeight: 'bold',
            }}
          >
            로그인이 완료되었습니다!
          </p>
          <BaseButton onClick={() => navigate('/bottles/bottles')}>
            시작하기
          </BaseButton>
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
    </LoginCard>
  );
}
