// src/pages/Signup.jsx
import React, { useState } from 'react';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import Header from '../components/Header/Header';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { checkEmailDuplicate } from '../api/auth';
import { Signup } from '../api/auth';

const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 200px;
  padding: 40px;
  background-color: #6a88cd;
  border-radius: 15px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const SignupPage = () => {
  const navigate = useNavigate();

  /*입력 상태 */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [step, setStep] = useState(1); // 1: 정보입력, 2: 프로필설정(회원가입_4)

  // 가입 버튼 클릭 시 실행
  const handleSignup = async () => {
    //1. 유효성 검사
    if (!email || !password) return alert('모든 필드를 입력해주세요.');
    if (password !== confirmPassword)
      return alert('비밀번호가 일치하지 않습니다.');
    try {
      //2. API 호출
      const userData = {
        userId: email.split('@')[0], // 아이디는 이메일 앞글자로 임시 지정
        nickname: '익명사용자', // 나중에 닉네임 입력 단계가 있다면 거기서 받기
        password: password,
        email: email,
        profileImage: '',
      };

      const result = await Signup(userData);

      if (result) {
        alert('회원가입에 성공했습니다!');
        navigate('/login'); // 성공 시 로그인 페이지로 이동
      }
    } catch (error) {
      alert('회원가입 중 오류가 발생했습니다.');
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
      <h2 style={{ fontsize: '2.5rem', marginBottom: '20px' }}>회원가입</h2>

      <Input
        type='email'
        placeholder='이메일 입력'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type='password'
        placeholder='비밀번호 입력'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        type='confirmPassword'
        placeholder='비밀번호 확인'
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        <Button variant='primary' size='md'>
          중복 확인
        </Button>
        <Button variant='primary' size='md'>
          다음
        </Button>
      </div>
    </div>
  );
};

export default SignupPage;
