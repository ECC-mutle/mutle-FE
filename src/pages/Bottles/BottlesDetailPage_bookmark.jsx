import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GetBottleDetail } from '../../api/bottles';
import BottleImg from '../../assets/images/유리병_png.png';

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

  if (loading) return <Container>유리병을 건져 올리는 중...</Container>;
  console.log('받아온 데이터 전체:', bottle);

  if (!bottle || !bottle.musicInfo) {
    return <Container>데이터를 불러오는 중입니다...</Container>;
  }

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
    <Container>
      <Title>MUTLE</Title>

      <Card>
        <BottleIcon src={BottleImg} alt='유리병' />

        <SectionTitle>오늘의 질문</SectionTitle>
        <QuestionText>{bottle.questionText}</QuestionText>

        <SectionTitle>선택한 음악</SectionTitle>
        <MusicCard>
          <AlbumArt src={bottle.musicInfo.artworkUrl60} alt='앨범 커버' />
          <MusicInfo>
            <TrackName>{bottle.musicInfo.trackName}</TrackName>
            <ArtistName>{bottle.musicInfo.artistName}</ArtistName>
          </MusicInfo>
        </MusicCard>

        <SectionTitle>남긴 메모</SectionTitle>
        <MemoBox>{bottle.memo || '작성된 메모가 없습니다.'}</MemoBox>

        <BackButton onClick={() => navigate('/island')}>뒤로가기</BackButton>
        <BackButton onClick={handleVisit}>섬 방문하기</BackButton>
      </Card>
    </Container>
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
