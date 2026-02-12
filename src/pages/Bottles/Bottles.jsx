// src/pages/Bottles/Bottles.jsx
import React, { useState, useEffect } from 'react';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import BottleImg from '../../assets/images/유리병_png.png';
import { GettodayQuest, SendBottle } from '../../api/bottles';
import { useLocation, useNavigate } from 'react-router-dom';

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

const SelectedMusicCard = styled.div`
  display: flex;
  align-items: center;
  background: #ffffff;
  padding: 12px;
  border-radius: 15px;
  border: 1px solid #add8e6;
  margin: 10px 0;
  text-align: left;
  cursor: pointer;
`;

const SelectedAlbumArt = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  margin-right: 15px;
`;

const SelectedMusicInfo = styled.div`
  display: flex;
  flex-direction: column;
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
        console.log('전송할 토큰:', storedToken); // 토큰이 제대로 찍히는지 확인

        if (!storedToken) {
          setQuestion('로그인 정보가 없습니다.');
          return;
        }

        const res = await GettodayQuest(storedToken);
        if (res.data) {
          setQuestion(res.data.questionText);
          setQuestionId(res.data.questionId); // 여기서 1이 제대로 들어가는지 확인
        }
        console.log('서버 전체 응답:', res); // 여기서 데이터 구조 확인

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

  // 2. 유리병 전송 함수
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

      console.log('전송할 데이터:', bottleData); // 전송 전 데이터 확인

      await SendBottle(token, bottleData);
      setStep(isPublic ? 3 : 4);
    } catch (error) {
      console.error('전송 에러 상세:', error.response);
      alert('전송에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

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
            </div>
            <p style={{ marginTop: '10px', color: '#888' }}>
              유리병 클릭하여 작성
            </p>
          </>
        )}

        {step === 2 && (
          <>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
              오늘의 유리병 보내기
            </h2>
            <p style={{ marginBottom: '20px', fontWeight: 'bold' }}>
              {question}
            </p>
            {selectedMusic ? (
              <SelectedMusicCard onClick={() => navigate('/search-music')}>
                <SelectedAlbumArt
                  src={selectedMusic.artworkUrl60}
                  alt='album'
                />
                <SelectedMusicInfo>
                  <strong style={{ fontSize: '0.9rem' }}>
                    {selectedMusic.trackName}
                  </strong>
                  <span style={{ fontSize: '0.8rem', color: '#666' }}>
                    {selectedMusic.artistName}
                  </span>
                </SelectedMusicInfo>
              </SelectedMusicCard>
            ) : (
              <div
                onClick={() => navigate('/search-music')}
                style={{
                  width: '100%',
                  padding: '15px',
                  margin: '10px 0',
                  borderRadius: '15px',
                  border: '1px solid #ccc',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  textAlign: 'left',
                  color: '#aaa',
                  boxSizing: 'border-box',
                }}
              >
                클릭하여 음악 선택
              </div>
            )}
            <TextArea
              placeholder='클릭하여 메모 입력'
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            />
            <div
              style={{
                marginTop: '20px',
                display: 'flex',
                justifyContent: 'center',
                gap: '10px',
              }}
            >
              <button
                onClick={() => handleSend(true)}
                disabled={loading}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#A2D2FF',
                  border: 'none',
                  borderRadius: '20px',
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                {loading ? '전송 중...' : '보내기'}
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
              onClick={() => navigate('/Me')}
              style={{
                backgroundColor: '#A2D2FF',
                color: 'white',
                border: 'none',
                padding: '10px 30px',
                borderRadius: '20px',
              }}
            >
              홈으로 이동하기
            </button>
            <button
              onClick={() => navigate('/random')}
              style={{
                backgroundColor: '#A2D2FF',
                color: 'white',
                border: 'none',
                padding: '10px 30px',
                borderRadius: '20px',
              }}
            >
              유리병 받기!
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
              onClick={() => navigate('/Me')}
              style={{
                backgroundColor: '#A2D2FF',
                color: 'white',
                border: 'none',
                padding: '10px 30px',
                borderRadius: '20px',
                cursor: 'pointer',
              }}
            >
              홈으로 이동
            </button>
          </>
        )}
      </Card>

      {step === 1 && (
        <p style={{ marginTop: '30px' }}>
          <Link
            to='/Me'
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
}
