import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GetBottleDetail } from '../../api/bottles';
import Header from '../../components/Header/Header';
import BottleImg from '../../assets/images/유리병_png.png';

export default function BottleDetailPage() {
  const { bottleId } = useParams();
  const navigate = useNavigate();
  const [bottle, setBottle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');

        // 주소창에서 얻은 bottleId를 API에 그대로 전달
        const res = await GetBottleDetail(token, bottleId);
        console.log('API 응답 전체:', res);
        setBottle(res.data);
      } catch (error) {
        console.error('데이터 로드 실패:', error);

        navigate(-1);
        alert(
          `에러 발생: ${error.response?.data?.message || '데이터를 찾을 수 없습니다.'}`,
        );
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [bottleId, navigate]);

  if (loading) return <Container>유리병을 건져 올리는 중...</Container>;
  console.log('받아온 데이터 전체:', bottle);

  if (!bottle || !bottle.musicInfo) {
    return <Container>데이터를 불러오는 중입니다...</Container>;
  }

  return (
    <PageWrapper>
      <Header />
      <LoginCard>
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
                  {bottle.musicInfo.trackName}
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
            <p>{bottle.memo || '작성된 메모가 없습니다.'}</p>
            <HeartBadge>❤️ {bottle.totalCount || 0}</HeartBadge>
          </WhiteInputBox>
        </PaperContent>

        <ButtonGroup>
          <ActionButton onClick={() => navigate(-1)}>뒤로가기</ActionButton>
        </ButtonGroup>
      </LoginCard>
    </PageWrapper>
  );
}

import styled from '@emotion/styled';

// 스타일 코드

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
  background-color: #f0f8ff;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
  letter-spacing: 2px;
`;

export const Card = styled.div`
  background: rgba(255, 255, 255, 0.85);
  padding: 40px;
  border-radius: 24px;
  border: 2px solid #add8e6;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 10px 25px rgba(173, 216, 230, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BottleIcon = styled.img`
  width: 80px;
  margin-bottom: 20px;
`;

export const SectionTitle = styled.h3`
  font-size: 0.9rem;
  color: #888;
  margin-top: 20px;
  margin-bottom: 8px;
  align-self: flex-start;
`;

export const QuestionText = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  line-height: 1.4;
  word-break: keep-all;
`;

export const MusicCard = styled.div`
  display: flex;
  align-items: center;
  background: #ffffff;
  padding: 15px;
  border-radius: 16px;
  border: 1px solid #add8e6;
  width: 100%;
  text-align: left;
  box-sizing: border-box;
`;

export const AlbumArt = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  margin-right: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const MusicInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TrackName = styled.strong`
  font-size: 1rem;
  color: #222;
`;

export const ArtistName = styled.span`
  font-size: 0.85rem;
  color: #666;
  margin-top: 4px;
`;

export const MemoBox = styled.div`
  width: 100%;
  min-height: 100px;
  background: white;
  padding: 15px;
  border-radius: 12px;
  border: 1px solid #eee;
  text-align: left;
  font-size: 0.95rem;
  line-height: 1.6;
  color: #444;
  margin-bottom: 30px;
  box-sizing: border-box;
  white-space: pre-wrap; // 줄바꿈 유지
`;

export const BackButton = styled.button`
  padding: 12px 40px;
  background-color: #a2d2ff;
  color: white;
  border: none;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background-color: #8cc3f7;
  }
`;

export const StatusText = styled.p`
  color: #666;
  font-size: 1.1rem;
`;

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
  LoginCard: {
    width: '100%',
    maxWidth: '500px',
    margin: '0 auto',
    background: '#e0f2f1',
    height: '100vh',
    padding: '20px',
    boxSizing: 'border-box',
  },
};
