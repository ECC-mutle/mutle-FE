// src/pages/Bottles/Bottles.jsx
import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import Header from '../../components/Header/Header';
import { Link } from 'react-router-dom';
import BottleImg from '../../assets/images/유리병_png.png';
import { GettodayQuest, SendBottle } from '../../api/bottles';
import { useLocation, useNavigate } from 'react-router-dom';

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

const TitleBar = styled.div`
  background: white;
  width: 90%;
  max-width: 750px;
  height: 45px;
  border-radius: 25px;
  border: 1px solid #333;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 1rem;
  position: absolute;
  top: 25px;
`;

const BottleImage = styled.img`
  width: 220px;
  cursor: ${(props) => (props.isStep1 ? 'pointer' : 'default')};
  transition: transform 0.2s;
  &:hover {
    transform: ${(props) => (props.isStep1 ? 'scale(1.05)' : 'none')};
  }
`;

const ActionText = styled.p`
  margin-top: 20px;
  font-size: 1.1rem;
  color: #78909c;
`;

const PaperContent = styled.div`
  background-color: #fffcf1;
  width: 70%;
  height: 330px;
  margin-top: 60px;
  border-radius: 5px;
  box-shadow: 8px 8px 0px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  gap: 12px;
  position: relative;
`;

const BlueBar = styled.div`
  background-color: #a2d2ff;
  width: 90%;
  height: 38px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0;
  padding: 0 15px;
  text-align: center;
`;

const WhiteInputBox = styled.div`
  background-color: white;
  width: 65%;
  height: 85px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  overflow: hidden;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.02);
  cursor: pointer;
`;

const StyledTextArea = styled.textarea`
  background-color: transparent;
  width: 100%;
  height: auto;
  max-height: 70px;
  border: none;
  padding: 0 15px;
  resize: none;
  outline: none;
  font-size: 0.95rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  line-height: 1.4;

  &::placeholder {
    color: #333;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 15px;
`;

const ActionButton = styled.button`
  padding: 8px 25px;
  border-radius: 20px;
  border: none;
  color: white;
  font-weight: bold;
  cursor: pointer;
  background-color: ${(props) => (props.primary ? '#74b9ff' : '#fff')};
  color: ${(props) => (props.primary ? '#fff' : '#74b9ff')};
  border: ${(props) => (props.primary ? 'none' : '2px solid #74b9ff')};
`;

const SuccessBar = styled.div`
  background-color: #fff3cd;
  width: 80%;
  max-width: 600px;
  height: 45px;
  border-radius: 25px;
  border: 1px solid #ffcc80;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  font-size: 1rem;
  font-weight: 500;
  margin: 30px 0;
`;

export default function BottlesPage() {
  const [step, setStep] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedMusic, setSelectedMusic] = useState(null);
  // 데이터 상태 관리
  const [question, setQuestion] = useState('질문을 불러오는 중...');
  const [questionId, setQuestionId] = useState(0);
  const [music, setMusic] = useState('');
  const [memo, setMemo] = useState('');
  const [loading, setLoading] = useState(false);
  const hasRequested = useRef(false);

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');

    // 이미 요청을 보냈거나 코드가 없으면 실행 안 함
    if (code && !hasRequested.current) {
      hasRequested.current = true; // 실행 표시
      sendCodeToBackend(code);
    }
  }, []);

  // 1. 오늘의 질문 가져오기
  useEffect(() => {
    if (location.state && location.state.selectedMusic) {
      const musicData = location.state.selectedMusic;
      setSelectedMusic(musicData); // 전체 객체를 저장해야 앨범 아트, 가수가 보입니다.
      setMusic(musicData.trackName); // API 전송용 제목 저장
      setStep(2); // 바로 작성 단계로 이동
    }
  }, [location.state]);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        console.log('전송할 토큰:', storedToken);

        if (!storedToken) {
          setQuestion('로그인 정보가 없습니다.');
          return;
        }

        const res = await GettodayQuest(storedToken);
        if (res.data) {
          setQuestion(res.data.questionText);
          setQuestionId(res.data.questionId);
        }
        console.log('서버 전체 응답:', res);

        const questData = res.data;

        if (questData && questData.questionText) {
          setQuestion(questData.questionText);
          setQuestionId(questData.questionId);
        } else {
          setQuestion('오늘의 질문을 찾을 수 없습니다.');
        }
      } catch (error) {
        console.error('에러 디테일:', error.response);
        setQuestion('질문을 불러오는 중에 오류가 발생했습니다.');
      }
    };
    fetchQuestion();
  }, []);

  const handleSend = async (isPublic) => {
    if (!selectedMusic) {
      alert('음악을 선택해주세요!');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');

      const bottleData = {
        questionId: Number(questionId),
        musicInfo: {
          musicId: Number(selectedMusic.trackId || selectedMusic.musicId || 1),
          trackName: String(selectedMusic.trackName),
          artistName: String(selectedMusic.artistName),
          artworkUrl60: String(selectedMusic.artworkUrl60),
        },
        memo: String(memo),
        isShared: isPublic,
      };

      console.log('전송할 데이터:', bottleData);

      // 2. 전송 성공 직후, 서버에서 최신 프로필/캘린더 정보를 다시 가져옴
      // musicCalendar에 방금 보낸 병 추가하는 작업
      if (typeof fetchProfileData === 'function') {
        await fetchProfileData();
      }
      setStep(isPublic ? 3 : 4);
    } catch (error) {
      console.error('전송 에러 상세:', error.response);
      alert('오늘 이미 유리병을 작성했습니다.');
      navigate('/island');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <Header />
      <LoginCard>
        {step === 1 && (
          <>
            <TitleBar>오늘의 유리병 보내기</TitleBar>
            <div onClick={() => setStep(2)} style={{ cursor: 'pointer' }}>
              <BottleImage src={BottleImg} alt='유리병' isStep1={true} />
            </div>

            <ActionText> 유리병 클릭하여 작성</ActionText>

            <Link
              to='/island'
              style={{
                position: 'absolute',
                bottom: '40px',
                color: '#555',
                textDecoration: 'underline',
                fontSize: '0.9rem',
              }}
            >
              나중에 작성하기
            </Link>
          </>
        )}

        {step === 2 && (
          <>
            <TitleBar>오늘의 유리병 작성하기</TitleBar>
            <PaperContent>
              <BlueBar>Q. {question}</BlueBar>
              <WhiteInputBox onClick={() => navigate('/search-music')}>
                {selectedMusic ? (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '25px',
                      padding: '0 15px',
                      width: '100%',
                    }}
                  >
                    <img
                      src={selectedMusic.artworkUrl60}
                      alt='album'
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '8px',
                        border: '1px solid #eee',
                        flexShrink: 0,
                      }}
                    />
                    <div
                      style={{
                        color: '#333',
                        textAlign: 'left',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <strong style={{ display: 'block', fontSize: '0.95rem' }}>
                        {selectedMusic.trackName}
                      </strong>
                      <span style={{ fontSize: '0.8rem', color: '#666' }}>
                        {' '}
                        {selectedMusic.artistName}
                      </span>
                    </div>
                  </div>
                ) : (
                  '클릭하여 음악 선택'
                )}
              </WhiteInputBox>

              <BlueBar>이 노래를 추천하는 이유!</BlueBar>
              <WhiteInputBox as='label'>
                <StyledTextArea
                  placeholder='클릭하여 메모 입력'
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                />
              </WhiteInputBox>
            </PaperContent>

            <ButtonGroup>
              <ActionButton primary onClick={() => handleSend(true)}>
                {loading ? '전송 중...' : '보내기'}
              </ActionButton>
              <ActionButton onClick={() => handleSend(false)}>
                나만 보기
              </ActionButton>
            </ButtonGroup>
          </>
        )}

        {step === 3 && (
          <>
            <BottleImage src={BottleImg} alt='유리병' />
            <SuccessBar>유리병을 성공적으로 전송했어요!</SuccessBar>
            <ActionButton onClick={() => navigate('/random')}>
              유리병 받기!
            </ActionButton>
          </>
        )}

        {step === 4 && (
          <>
            <BottleImage src={BottleImg} alt='유리병' />
            <SuccessBar>유리병이 성공적으로 저장되었어요!</SuccessBar>
            <ActionButton onClick={() => navigate('/island')}>
              홈으로 이동
            </ActionButton>
          </>
        )}
      </LoginCard>
    </PageWrapper>
  );
}
