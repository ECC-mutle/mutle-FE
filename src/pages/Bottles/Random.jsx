// src/pages/Bottles/Random.jsx
import React, { useState, useEffect } from 'react';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import BottleImg from '../../assets/images/유리병_png.png';
import { Link } from 'react-router-dom';
import { GetBottle, ReactBottle, AddBookmark } from '../../api/bottles';

const BottleImage = styled.img`
  width: 150px;
  cursor: pointer;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.1);
  }
`;
//유리병 이미지는 고정!

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
  header: {
    background: '#b2ebf2',
    padding: '10px',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  logo: {
    width: '20px',
    height: '20px',
    background: '#ff4081',
    borderRadius: '50%',
    marginRight: '10px',
  },
  card: {
    background: '#fff',
    borderRadius: '15px',
    border: '1px solid #ddd',
    padding: '20px',
    textAlign: 'center',
    minHeight: '400px',
    position: 'relative',
  },
  titleBar: {
    borderBottom: '1px solid #eee',
    paddingBottom: '10px',
    marginBottom: '30px',
    fontWeight: 'bold',
  },
  contentCenter: { cursor: 'pointer', marginTop: '50px' },
  bottleIcon: { fontSize: '80px' },
  guideText: { color: '#999', marginTop: '20px' },
  detailContent: { display: 'flex', flexDirection: 'column', gap: '15px' },
  questionBox: {
    background: '#90caf9',
    color: '#fff',
    padding: '8px',
    borderRadius: '15px',
  },
  musicBox: {
    border: '1px solid #eee',
    padding: '15px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  albumArt: {
    width: '50px',
    height: '50px',
    background: '#eee',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  musicInfo: { textAlign: 'left' },
  memoBox: {
    background: '#f9f9f9',
    padding: '20px',
    borderRadius: '10px',
    minHeight: '100px',
    position: 'relative',
  },
  heart: {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    background: '#ff5252',
    color: '#fff',
    padding: '2px 8px',
    borderRadius: '10px',
    fontSize: '12px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: '20px',
  },
  btnNav: {
    border: '1px solid #ccc',
    background: '#fff',
    padding: '5px 15px',
    borderRadius: '5px',
  },
  btnStore: {
    background: '#4dd0e1',
    border: 'none',
    color: '#fff',
    padding: '5px 15px',
    borderRadius: '5px',
  },
};

export default function RandomPage() {
  const navigate = useNavigate();
  // viewMode: 'list' (유리병 화면), 'detail' (메시지 화면)
  const [viewMode, setViewMode] = useState('list');
  const [bottle, setBottle] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchBottle = async () => {
      try {
        setLoading(true);
        const response = await GetBottle(token);

        // 중요: 콘솔을 찍어서 데이터가 어떻게 생겼는지 꼭 확인하세요!
        console.log('서버 응답 데이터:', response);

        // 만약 response 자체가 객체라면 response를,
        // 만약 response.data 안에 진짜 내용이 있다면 response.data를 넣어야 합니다.
        // 보통 공통 응답 포맷을 쓰면 response.data에 실제 데이터가 들어있습니다.
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

  // 2. 하트 클릭: 유리병 반응 남기기
  const handleLike = async (e) => {
    e.stopPropagation();

    // 1. 데이터가 있는지 먼저 확인
    if (!bottle || !bottle.bottleId) {
      console.error('유리병 정보가 없어 반응을 남길 수 없습니다.', bottle);
      return;
    }

    console.log('반응을 남길 유리병 ID:', bottle.bottleId); // 여기서 2가 나오는지 485가 나오는지 확인!

    try {
      await ReactBottle(token, bottle.bottleId);
      // 서버 응답 구조에 맞춰 totalCount 증가
      setBottle({ ...bottle, totalCount: (bottle.totalCount || 0) + 1 });
      alert('마음을 전했습니다! ❤️');
    } catch (error) {
      alert('반응을 남기는 데 실패했습니다. (인증 오류 가능성)');
    }
  };

  // 3. 저장하기: 북마크 추가
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
    <div style={styles.container}>
      <main style={styles.card}>
        <div style={styles.titleBar}>
          {bottle.sender?.senderNickname || '익명'} 님이 유리병을 보내왔어요!
        </div>

        {viewMode === 'list' ? (
          <div
            style={styles.contentCenter}
            onClick={() => setViewMode('detail')}
          >
            <BottleImage src={BottleImg} alt='유리병' />
            <p style={styles.guideText}>클릭하여 자세히 보기</p>
          </div>
        ) : (
          <div style={styles.detailContent}>
            <div style={styles.questionBox}>Q. {bottle.questionText}</div>

            <div style={styles.musicBox}>
              <div style={styles.albumArt}>
                {bottle.musicInfo?.artworkUrl60 ? (
                  <img
                    src={bottle.musicInfo.artworkUrl60}
                    alt='앨범커버'
                    style={{ width: '100%' }}
                  />
                ) : (
                  '🎵'
                )}
              </div>
              <div style={styles.musicInfo}>
                <p>
                  <strong>{bottle.musicInfo?.trackName}</strong>
                </p>
                <p>{bottle.musicInfo.artistName}</p>
              </div>
            </div>

            <div style={styles.memoBox}>
              <p>{bottle.memo}</p>
              {/* 하트 버튼 클릭 시 handleLike 호출 */}
              <span
                style={{ ...styles.heart, cursor: 'pointer' }}
                onClick={handleLike}
              >
                ❤️ {bottle.totalCount || 0}
              </span>
            </div>

            <div style={styles.buttonGroup}>
              {/* 넘어가기: Me 페이지로 이동 */}
              <button style={styles.btnNav} onClick={() => navigate('/Me')}>
                넘어가기
              </button>
              {/* 저장하기: 북마크 API 호출 */}
              <button style={styles.btnStore} onClick={handleSave}>
                저장하기
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
