import React from 'react';
import { useNavigate } from 'react-router-dom';

const BottleCard = ({ data }) => {
  const navigate = useNavigate();

  if (!data) return null;

  const handleDetailClick = () => {
    navigate(`/bookmarkbottles/${data.bottleId}`);
  };

  return (
    <div style={styles.card}>
      {/* 상단: 프로필 및 아이디 */}
      <div style={styles.profileSection}>
        <img
          src={data.senderProfileImage}
          alt='profile'
          style={styles.profileImg}
        />
        <span style={styles.userId}>{data.senderNickname}</span>
        <span style={styles.star}>⭐</span>
      </div>

      {/* 질문 영역 */}
      <div style={styles.questionBox}>Q. {data.questionText}</div>

      {/* 음악 정보 영역 (미리보기) */}
      <div style={styles.musicBox}>
        <img
          src={data.musicInfo.artworkUrl60}
          alt='album'
          style={styles.albumArt}
        />
        <div style={styles.musicInfo}>
          <div style={styles.trackName}>{data.musicInfo.trackName}</div>
          <div style={styles.artistName}>{data.musicInfo.artistName}</div>
        </div>
      </div>

      {/* 하단: 상세보기 버튼 */}
      <div style={styles.buttonWrapper}>
        <button style={styles.detailButton} onClick={handleDetailClick}>
          상세보기
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: 'white',
    borderRadius: '24px',
    padding: '20px',
    border: '1px solid #e0e0e0',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    minWidth: '280px',
  },
  profileSection: { display: 'flex', alignItems: 'center', gap: '8px' },
  profileImg: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#ffeb3b',
  },
  userId: { fontWeight: 'bold', fontSize: '16px' },
  questionBox: {
    backgroundColor: '#a2d2ff',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    textAlign: 'center',
  },
  musicBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px',
    borderRadius: '20px',
    border: '1px solid #eee',
  },
  albumArt: { width: '40px', height: '40px', borderRadius: '8px' },
  musicText: { display: 'flex', flexDirection: 'column', fontSize: '12px' },
  trackName: { fontWeight: '600' },
  artistName: { color: '#888' },
  buttonWrapper: { display: 'flex', justifyContent: 'flex-end' },
  detailButton: {
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    padding: '6px 16px',
    borderRadius: '15px',
    fontSize: '12px',
    cursor: 'pointer',
  },
};

export default BottleCard;
