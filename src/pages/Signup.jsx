// src/pages/Signup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import styled from '@emotion/styled';
import { CheckEmailDuplicate } from '../api/auth';
import { CheckIdDuplicate } from '../api/auth';
import { UploadImage } from '../api/image';

import { Signup } from '../api/auth';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
`;

const LoginCard = styled.div`
  width: 90%;
  max-width: 900px;
  height: 550px;
  background-color: rgba(178, 235, 242, 0.7);
  border-radius: 30px;
  border: 1px solid #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  margin-top: 20px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 500px;
  background-color: #b2ebf2;
  border: 1px solid #757575;
  border-radius: 40px; /* 아주 둥글게 */
  padding: 5px 20px;
  margin-bottom: 15px;
  box-sizing: border-box;
`;

const Duplicateutton = styled.button`
  background-color: ${(props) =>
    props.$isCheck ? '#B8B7B6' : '#000'}; // 체크되면 회색, 아니면 검정색
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 15px;
  font-size: 13px;
  cursor: pointer;
  white-space: nowrap;
  margin-left: 10px;
  transition: background-color 0.3s ease;

  &:disabled {
    background-color: #555;
  }

  &:hover {
    opacity: 0.8;
  }
`;

const NextButton = styled.button`
  background-color: #4fc3f7; /* 파란색 버튼 */
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 30px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: #29b6f6;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  text-align: center;
`;

const InputField = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  padding: 12px 0;
  font-size: 16px;
  outline: none;
  color: #333;

  &::placeholder {
    color: #757575;
  }
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
  const [previewUrl, setPreviewUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      // 미리보기 URL 생성
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleIdCheck = async () => {
    if (formData.userId.length < 4) return alert('ID를 4자 이상 입력해주세요.');

    try {
      const response = await CheckIdDuplicate(formData.userId);

      // 서버 응답의 status가 'success'이면 중복이 아니라는 뜻!
      if (response.status === 'success') {
        alert('사용 가능한 아이디입니다.');
        setIsIdChecked(true);
      } else {
        // 서버에서 success가 아닌 다른 값을 보낼 경우 (중복 등)
        alert(response.message || '이미 가입한 아이디입니다.');
        setIsIdChecked(false);
      }
    } catch (error) {
      // 400이나 409 같은 에러 코드로 올 경우 catch에서 처리
      if (error.response && error.response.status === 400) {
        alert('이미 존재하는 아이디입니다.');
      } else {
        alert('중복 확인 중 오류가 발생했습니다.');
      }
      setIsIdChecked(false);
    }
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
    if (isLoading) return;

    setIsLoading(true);
    try {
      let finalProfileImageUrl = '';

      if (selectedFile) {
        const uploadResult = await UploadImage(selectedFile);

        finalProfileImageUrl = uploadResult.data;
      }

      const finalData = {
        userId: formData.userId,
        nickname: formData.nickname,
        password: formData.password,
        email: formData.email,
        profileImage: finalProfileImageUrl,
      };

      const result = await Signup(finalData);

      if (result) {
        setStep(3);
      }
    } catch (error) {
      alert('회원가입 처리 중 오류가 발생했습니다.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper>
      <Header />
      <LoginCard>
        {/* 단계별 제목 */}
        <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>
          {step === 3 ? '가입 완료' : '회원가입'}
        </h2>
        {/* Step 1: 이메일 및 비밀번호 설정 */}
        {step === 1 && (
          <>
            <InputWrapper>
              <InputField
                name='email'
                type='email'
                placeholder='이메일 입력'
                value={formData.email}
                onChange={handleChange}
              />
              <Duplicateutton
                onClick={handleEmailCheck}
                $isCheck={isEmailChecked}
              >
                {isEmailChecked ? '인증 완료' : '중복 확인'}
              </Duplicateutton>
            </InputWrapper>

            <InputWrapper>
              <InputField
                name='password'
                type='password'
                placeholder='비밀번호를 8~16자 영문, 숫자, 특수문자 조합으로 입력하세요.'
                value={formData.password}
                onChange={handleChange}
              />
            </InputWrapper>
            <InputWrapper>
              <InputField
                name='confirmPassword'
                type='password'
                placeholder='비밀번호 확인'
                value={formData.confirmPassword}
                onChange={handleChange}
                onKeyDown={(e) => e.key === 'Enter' && handleNextStep()}
              />
            </InputWrapper>

            <NextButton onClick={handleNextStep} disabled={!isEmailChecked}>
              다음
            </NextButton>
          </>
        )}

        {/* Step 2: 아이디 설정 */}
        {step === 2 && (
          <>
            <InputWrapper>
              <InputField
                name='userId'
                placeholder='사용할 ID 입력'
                value={formData.userId}
                onChange={handleChange}
              />
              <Duplicateutton
                type='button'
                onClick={handleIdCheck}
                $isCheck={isIdChecked}
              >
                {isIdChecked ? '인증 완료' : '중복 확인'}
              </Duplicateutton>
            </InputWrapper>

            <NextButton onClick={handleNextStep} disabled={!isIdChecked}>
              다음
            </NextButton>
          </>
        )}

        {/* Step 4: 프로필 설정 */}
        {step === 4 && (
          <>
            <div style={{ marginBottom: '10px' }}>
              프로필 이미지를 선택해주세요.
            </div>
            {previewUrl && (
              <img
                src={previewUrl}
                alt='미리보기'
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  marginBottom: '10px',
                  objectFit: 'cover',
                }}
              />
            )}

            <input
              type='file'
              accept='image/*'
              onChange={handleFileChange}
              style={{ marginBottom: '10px' }}
            />
            <InputWrapper>
              <InputField
                name='nickname'
                placeholder='닉네임 입력'
                value={formData.nickname}
                onChange={handleChange}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              />
            </InputWrapper>

            <NextButton onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? '가입 중...' : '가입하기'}
            </NextButton>
          </>
        )}

        {/* Step 3: 최종 완료 화면 */}
        {step === 3 && (
          <>
            <p style={{ fontSize: '1.2rem', margin: '20px 0' }}>
              회원가입이 완료되었습니다!
            </p>
            <NextButton onClick={() => navigate('/login')}>
              로그인하러 가기
            </NextButton>
          </>
        )}
      </LoginCard>
    </PageWrapper>
  );
}
