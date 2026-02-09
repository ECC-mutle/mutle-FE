// src/pages/Bottles/Random.jsx
import React, { useState } from 'react';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import BottleImg from '../../assets/images/유리병_png.png';

const BottleImage = styled.img`
  width: 150px;
  cursor: pointer;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.1);
  }
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

const RandomPage = () => {
  // viewMode: 'list' (유리병 화면), 'detail' (메시지 화면)
  const [viewMode, setViewMode] = useState('list');

  // 임시 데이터
  const messageData = {
    sender: '유저이름',
    question: '겨울에 가장 듣고 싶은 노래는?',
    songTitle: '그대 내게 다시',
    artist: '럼블피쉬',
    memo: '메모 내용이 여기에 들어갑니다.',
    likes: 13,
  };

  return (
    <div style={styles.container}>
      <main style={styles.card}>
        <div style={styles.titleBar}>
          {messageData.sender} 이 유리병을 보내왔어요!
        </div>

        {viewMode === 'list' ? (
          /* 1. 유리병 화면 */
          <div
            style={styles.contentCenter}
            onClick={() => setViewMode('detail')}
          >
            <div>
              <BottleImage src={BottleImg} alt='유리병' />
            </div>

            <p style={styles.guideText}>클릭하여 자세히 보기</p>
          </div>
        ) : (
          /* 2. 상세 내용 화면 */
          <div style={styles.detailContent}>
            <div style={styles.questionBox}>Q. {messageData.question}</div>

            <div style={styles.musicBox}>
              <div style={styles.albumArt}>🎵</div>
              <div style={styles.musicInfo}>
                <p>
                  <strong>{messageData.songTitle}</strong>
                </p>
                <p>{messageData.artist}</p>
              </div>
            </div>

            <div style={styles.memoBox}>
              <p>{messageData.memo}</p>
              <span style={styles.heart}>❤️ {messageData.likes}</span>
            </div>

            <div style={styles.buttonGroup}>
              <button style={styles.btnNav} onClick={() => setViewMode('list')}>
                넘어가기
              </button>
              <button style={styles.btnStore}>저장하기</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
export default RandomPage;

//일단 state로 설정해둠. api 호출할 때 홈 화면이랑 연결해야함! (not state...)
