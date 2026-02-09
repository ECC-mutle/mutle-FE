// src/pages/Bottles/Bottles.jsx
import React, { useState } from 'react';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import BottleImg from '../../assets/images/유리병_png.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #f0f8ff; /* 배경 이미지가 없다면 하늘색으로 대체 */
  text-align: center;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.8);
  padding: 40px;
  border-radius: 20px;
  border: 2px solid #add8e6;
  width: 80%;
  max-width: 600px;
  position: relative;
`;

const BottleImage = styled.img`
  width: 150px;
  cursor: pointer;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.1);
  }
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 10px;
  border: 1px solid #ccc;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  margin: 10px 0;
  border-radius: 10px;
  border: 1px solid #ccc;
  resize: none;
`;

const BottlesPage = () => {
  const [step, setStep] = useState(1);

  return (
    <Container>
      <h1 style={{ fontSize: '2rem', marginBottom: '20px', color: '#333' }}>
        MUTLE
      </h1>

      <Card>
        {step === 1 && (
          <>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
              오늘의 유리병 보내기
            </h2>
            <div onClick={() => setStep(2)} style={{ cursor: 'pointer' }}>
              <BottleImage src={BottleImg} alt='유리병' />
              <p style={{ marginTop: '10px', color: '#888' }}>클릭하여 작성</p>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
              오늘의 유리병 작성하기
            </h2>
            <InputField placeholder='Q. 겨울에 가장 듣고 싶은 노래는?' />
            <TextArea placeholder='클릭하여 메모 입력' />
            <div
              style={{
                marginTop: '20px',
                display: 'flex',
                justifyContent: 'center',
                gap: '10px',
              }}
            >
              <button
                onClick={() => setStep(3)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#A2D2FF',
                  border: 'none',
                  borderRadius: '20px',
                  color: 'white',
                }}
              >
                보내기
              </button>
              <button
                onClick={() => setStep(4)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#fff',
                  border: '1px solid #A2D2FF',
                  borderRadius: '20px',
                }}
              >
                나만 보기
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <BottleImage src={BottleImg} alt='유리병' />
            <div
              style={{
                backgroundColor: '#FFEBCD',
                padding: '10px 20px',
                borderRadius: '20px',
                margin: '20px 0',
              }}
            >
              유리병을 성공적으로 전송했어요!
            </div>
            <button
              onClick={() => setStep(1)}
              style={{
                backgroundColor: '#A2D2FF',
                color: 'white',
                border: 'none',
                padding: '10px 30px',
                borderRadius: '20px',
              }}
            >
              보내기
            </button>
          </>
        )}

        {step === 4 && (
          <>
            <BottleImage src={BottleImg} alt='유리병' />
            <div
              style={{
                backgroundColor: '#FFEBCD',
                padding: '10px 20px',
                borderRadius: '20px',
                margin: '20px 0',
              }}
            >
              유리병이 성공적으로 저장되었어요!
            </div>
            <button
              onClick={() => setStep(1)}
              style={{
                backgroundColor: '#A2D2FF',
                color: 'white',
                border: 'none',
                padding: '10px 30px',
                borderRadius: '20px',
              }}
            >
              OK
            </button>
          </>
        )}
      </Card>

      {step === 1 && (
        <p style={{ marginTop: '30px' }}>
          <Link
            to='/signup'
            style={{
              color: '#555',
              textDecoration: 'none',
              fontSize: '0.9rem',
            }}
          >
            나중에 작성하기
          </Link>
        </p>
      )}
    </Container>
  );
};

export default BottlesPage;

//화면은 띄워놨는데 연결은 다 안됨. 보내기 성공이라고 뜨는 건 버튼 형식임. 보내는 건 따로 연결해야함 API
