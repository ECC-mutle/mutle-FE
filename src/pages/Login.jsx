// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  width: 600px;
  height: auto;
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
  border: 1px solid #455a64;
  background-color: rgba(255, 255, 255, 0.4);
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
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleNext = () => {
    if (!userId) return alert('아이디를 입력해주세요.');
    setStep(2);
  };

  const handleLogin = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setErrorMessage('');

    try {
      const result = await Login(userId, password);
      if (result) {
        localStorage.setItem('token', result.data.accessToken);
        localStorage.setItem('userId', result.data.userId);
        console.log('결과값:', result);
        setStep(3); // 성공 화면
      }
    } catch (error) {
      const serverMessage = error.response?.data?.message || '';
      let displayMessage = '로그인 정보가 일치하지 않습니다.';

      if (serverMessage.includes('사용자')) {
        displayMessage = '존재하지 않는 아이디입니다.';
      } else if (serverMessage.includes('비밀번호')) {
        displayMessage = '비밀번호가 틀렸습니다.';
      }

      setErrorMessage(displayMessage);

      setStep(4); // 실패 화면
    } finally {
      setIsLoading(false);
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
            onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleLogin()}
          />
          <BaseButton onClick={handleLogin} disabled={isLoading}>
            {isLoading ? '로그인 중...' : '로그인'}
          </BaseButton>

          {!isLoading && (
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
          )}
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
            <p style={{ color: 'red', marginBottom: '20px' }}>{errorMessage}</p>
            <Button onClick={() => setStep(1)}>다시 시도하기</Button>
          </>
        </>
      )}
    </LoginCard>
  );
}
