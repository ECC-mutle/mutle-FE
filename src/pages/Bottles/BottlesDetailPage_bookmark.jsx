import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GetBottleDetail } from '../../api/bottles';
import BottleImg from '../../assets/images/유리병_png.png';
import Header from '../../components/Header/Header';
import styled from '@emotion/styled';
import { ReactBottle } from '../../api/bottles';

export default function BottlesDetailPage_bookmark() {
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
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [bottleId, navigate]);

  if (loading) return <LoginCard>유리병을 건져 올리는 중...</LoginCard>;
  console.log('받아온 데이터 전체:', bottle);

  if (!bottle || !bottle.musicInfo) {
    return <LoginCard>데이터를 불러오는 중입니다...</LoginCard>;
  }

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

  const handleVisit = () => {
    console.log('현재 bottle 데이터:', bottle);
    const targetId = bottle?.sender?.senderUserId;
    if (!targetId) {
      alert('유저 ID 정보를 찾을 수 없습니다.');
      return;
    }

    navigate(`/island/${targetId}`);
  };

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
            <HeartBadge onClick={handleLike}>
              ❤️ {bottle.totalCount || 0}
            </HeartBadge>
          </WhiteInputBox>
        </PaperContent>

        <ButtonGroup>
          <ActionButton onClick={() => navigate(-1)}>뒤로가기</ActionButton>
          <ActionButton primary onClick={handleVisit}>
            {bottle.sender?.senderNickname || '익명'} 님의 섬 방문하기
          </ActionButton>
        </ButtonGroup>
      </LoginCard>
    </PageWrapper>
  );
}

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
