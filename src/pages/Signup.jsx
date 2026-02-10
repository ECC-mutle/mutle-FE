// src/pages/Signup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import Header from '../components/Header/Header';
import styled from '@emotion/styled';
import { CheckEmailDuplicate } from '../api/auth';
import { CheckIdDuplicate } from '../api/auth';

import { Signup } from '../api/auth';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  text-align: center;
`;

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

export default function SignupPage() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1); //1: 이메일/비번, 2: ID입력, 3: 완료, 4: 프로필/닉네임
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    userId: '',
    nickname: '',
    profileImage: '',
  });

  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isIdChecked, setIsIdChecked] = useState(false);

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmailCheck = async () => {
    try {
      const isDuplicate = await CheckEmailDuplicate(formData.email);
      if (isDuplicate) {
        alert('이미 가입한 이메일입니다.');
        setIsEmailChecked(false);
      } else {
        alert('사용 가능한 이메일입니다.');
        setIsEmailChecked(true);
      }
    } catch (error) {
      alert('중복 확인 중 오류가 발생했습니다.');
    }
  };

  const handleIdCheck = async () => {
    // API가 따로 있다면 해당 API 사용, 여기선 예시로 처리
    if (formData.userId.length < 4) return alert('ID를 4자 이상 입력해주세요.');
    alert('사용 가능한 ID입니다.');
    setIsIdChecked(true);
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!isEmailChecked) return alert('이메일 중복 확인을 해주세요.');
      if (formData.password !== formData.confirmPassword)
        return alert('비밀번호가 일치하지 않습니다.');
      if (!formData.password) return alert('비밀번호를 입력해주세요.');
      setStep(2);
    } else if (step === 2) {
      if (!isIdChecked) return alert('ID 중복 확인을 해주세요.');
      setStep(4);
    }
  };

  const handleSubmit = async () => {
    try {
      const result = await Signup(formData);
      if (result) {
        setStep(3); // 회원가입 완료 페이지(Step 3)로 이동
      }
    } catch (error) {
      alert('회원가입 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <Container>
      {/* 단계별 제목 */}
      <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>
        {step === 3 ? '가입 완료' : '회원가입'}
      </h2>

      <FormBox>
        {/* Step 1: 이메일 및 비밀번호 설정 */}
        {step === 1 && (
          <>
            <Input
              name='email'
              type='email'
              placeholder='이메일 입력'
              value={formData.email}
              onChange={handleChange}
            />
            <Button
              onClick={handleEmailCheck}
              variant={isEmailChecked ? 'success' : 'primary'}
            >
              {isEmailChecked ? '인증 완료' : '중복 확인'}
            </Button>

            <Input
              name='password'
              type='password'
              placeholder='비밀번호 입력'
              value={formData.password}
              onChange={handleChange}
            />
            <Input
              name='confirmPassword'
              type='password'
              placeholder='비밀번호 확인'
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <Button onClick={handleNextStep} disabled={!isEmailChecked}>
              다음
            </Button>
          </>
        )}

        {/* Step 2: 아이디 설정 */}
        {step === 2 && (
          <>
            <Input
              name='userId'
              placeholder='사용할 ID 입력'
              value={formData.userId}
              onChange={handleChange}
            />
            <Button
              onClick={handleIdCheck}
              variant={isIdChecked ? 'success' : 'primary'}
            >
              {isIdChecked ? '인증 완료' : '중복 확인'}
            </Button>
            <Button onClick={handleNextStep} disabled={!isIdChecked}>
              다음
            </Button>
          </>
        )}

        {/* Step 4: 프로필 설정 */}
        {step === 4 && (
          <>
            <div style={{ marginBottom: '10px' }}>
              프로필 이미지를 선택해주세요.
            </div>
            <Input
              name='nickname'
              placeholder='닉네임 입력'
              value={formData.nickname}
              onChange={handleChange}
            />
            <Button onClick={handleSubmit}>가입 완료</Button>
          </>
        )}

        {/* Step 3: 최종 완료 화면 */}
        {step === 3 && (
          <>
            <p style={{ fontSize: '1.2rem', margin: '20px 0' }}>
              회원가입이 완료되었습니다!
            </p>
            <Button onClick={() => navigate('/login')}>로그인하러 가기</Button>
          </>
        )}
      </FormBox>
    </Container>
  );
}
