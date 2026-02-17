// src/pages/Bottles/Random.jsx
import React, { useState, useEffect, useRef } from 'react';
import Header from '../../components/Header/Header';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import BottleImg from '../../assets/images/유리병_png.png';
import { Link } from 'react-router-dom';
import { GetBottle, ReactBottle, AddBookmark } from '../../api/bottles';

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
  justify-content: center; /* 중앙 정렬 */
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
  cursor: 'pointer';
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.05)};
  }
`;

const ActionText = styled.p`
  margin-top: 20px;
  font-size: 1.1rem;
  color: #78909c;
`;

const HeartBadge = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: #ff4757;
  color: white;
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  z-index: 10;
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
  width: 75%;
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

const styles = {
  container: {
    width: '100%',
    maxWidth: '500px',
    margin: '0 auto',
    background: '#e0f2f1',
    height: '100vh',
    padding: '20px',
    boxSizing: 'border-box',
  },
};

export default function RandomPage() {
  const navigate = useNavigate();
  // viewMode: 'list' (유리병 화면), 'detail' (메시지 화면)
  const [viewMode, setViewMode] = useState('list');
  const [bottle, setBottle] = useState(null);
  const [loading, setLoading] = useState(true);
  const hasCalled = useRef(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (hasCalled.current) return;

    const fetchBottle = async () => {
      try {
        setLoading(true);
        const response = await GetBottle(token);
        console.log('서버 응답 데이터:', response);

        const actualData = response.data || response;
        setBottle(actualData);
      } catch (error) {
        console.error('유리병 로드 실패', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBottle();
  }, [token]);

  const handleLike = async (e) => {
    e.stopPropagation();

    if (!bottle || !bottle.bottleId) {
      console.error('유리병 정보가 없어 반응을 남길 수 없습니다.', bottle);
      return;
    }

    console.log('반응을 남길 유리병 ID:', bottle.bottleId);

    try {
      await ReactBottle(token, bottle.bottleId);
      setBottle({ ...bottle, totalCount: (bottle.totalCount || 0) + 1 });
      alert('마음을 전했습니다! ❤️');
    } catch (error) {
      alert('반응을 남기는 데 실패했습니다. (인증 오류 가능성)');
    }
  };

  const handleSave = async () => {
    try {
      await AddBookmark(token, bottle.bottleId);
      alert('유리병을 보관함에 저장했어요! ✨');
    } catch (error) {
      alert('저장에 실패했거나 이미 저장된 유리병입니다.');
    }
  };

  if (loading) return <div style={styles.container}>유리병을 건지는 중...</div>;
  if (!bottle)
    return (
      <div style={styles.container}>현재 바다에 떠다니는 유리병이 없네요.</div>
    );

  return (
    <PageWrapper>
      <Header />
      <LoginCard>
        <TitleBar>
          {bottle.sender?.senderNickname || '익명'} 님이 유리병을 보내왔어요!
        </TitleBar>

        {viewMode === 'list' ? (
          <div onClick={() => setViewMode('detail')}>
            <BottleImage src={BottleImg} alt='유리병' />
            <ActionText> 클릭하여 자세히 보기</ActionText>
          </div>
        ) : (
          <>
            <PaperContent>
              <BlueBar>Q. {bottle.questionText}</BlueBar>
              <WhiteInputBox>
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
                    src={bottle.musicInfo.artworkUrl60}
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
                      {bottle.musicInfo?.trackName}
                    </strong>
                    <span style={{ fontSize: '0.8rem', color: '#666' }}>
                      {bottle.musicInfo.artistName}
                    </span>
                  </div>
                </div>
              </WhiteInputBox>

              <BlueBar>
                {bottle.sender?.senderNickname || '익명'} 님의 한마디
              </BlueBar>
              <WhiteInputBox as='label'>
                <p>{bottle.memo}</p>
                <HeartBadge onClick={handleLike}>
                  ❤️ {bottle.totalCount || 0}
                </HeartBadge>
              </WhiteInputBox>
            </PaperContent>

            <ButtonGroup>
              <ActionButton onClick={() => navigate('/Me')}>
                넘어가기
              </ActionButton>
              <ActionButton primary onClick={handleSave}>
                저장하기
              </ActionButton>
            </ButtonGroup>
          </>
        )}
      </LoginCard>
    </PageWrapper>
  );
}
