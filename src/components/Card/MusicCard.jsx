import { useNavigate } from 'react-router-dom';

import { useState } from 'react';
export default function MusicCard({ repMusic, platforms, onEdit }) {
  // repMusic: { trackName, artistName, artworkUrl160 } 또는 null
  const trackName = repMusic?.trackName || '곡 없음';
  const artistName = repMusic?.artistName || '아티스트 없음';
  const artworkUrl = repMusic?.artworkUrl160 || '텅';
  const navigate = useNavigate();

  const [showPlatformInput, setShowPlatformInput] = useState(false);
  const [newPlatformName, setNewPlatformName] = useState('');
  const [newPlatformNickname, setNewPlatformNickname] = useState('');

  const handleAddPlatform = async () => {
    try {
      const token = localStorage.getItem('token');

      const newPlatform = [
        {
          platformName: newPlatformName.toUpperCase(),
          platformNickname: newPlatformNickname,
        },
      ];

      // 기존 덮어쓰기 (의도된 동작)
      await UpdatePlatform(newPlatform, token);

      // 다시 전체 조회
      await fetchProfileData();

      // 프론트 state 즉시 업데이트
      setPlatforms(newPlatform);

      // 입력창 닫기 + 초기화
      setShowPlatformInput(false);
      setNewPlatformName('');
      setNewPlatformNickname('');
    } catch (error) {
      console.error('플랫폼 추가 실패:', error);
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.topArea}></div>

      <div style={styles.nowPlayingBox}>
        <p style={styles.title}>🎵 재생 중인 음악</p>

        <div style={styles.musicRow}>
          <img src={artworkUrl} style={styles.albumArt} />
          <div>
            <p style={styles.trackName}>{trackName}</p>
            <p style={styles.artistName}>{artistName}</p>
          </div>
        </div>
      </div>
      <button onClick={() => navigate('/search-music')}>🔍 음악 수정</button>

      {/* 🔗 플랫폼 버튼 */}
      <div style={styles.buttonGroup}>
        {platforms && platforms.length > 0 ? (
          <button style={styles.platformButton}>
            {platforms[0].platformName} · {platforms[0].platformNickname}
          </button>
        ) : (
          <p
            style={{ color: '#888', cursor: 'pointer' }}
            onClick={() => setShowPlatformInput(true)}
          >
            아직 아무것도 없어요 (클릭해서 추가)
          </p>
        )}
      </div>

      {showPlatformInput && (
        <div style={styles.inputBox}>
          <input
            placeholder='플랫폼 이름 (SPOTIFY 등)'
            value={newPlatformName}
            onChange={(e) => setNewPlatformName(e.target.value)}
          />
          <input
            placeholder='닉네임'
            value={newPlatformNickname}
            onChange={(e) => setNewPlatformNickname(e.target.value)}
          />
          <button onClick={handleAddPlatform}>추가</button>
          <button onClick={() => setShowPlatformInput(false)}>취소</button>
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
  },

  topArea: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    marginBottom: '16px',
  },

  nowPlayingBox: {
    border: '2px solid #d1d5db',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
  },

  title: {
    fontWeight: 'bold',
    marginBottom: '8px',
  },

  musicRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },

  albumArt: {
    width: '48px',
    height: '48px',
    backgroundColor: '#d1d5db',
    borderRadius: '4px',
  },

  trackName: {
    fontSize: '14px',
  },

  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },

  platformButton: {
    width: '100%',
    backgroundColor: 'black',
    color: 'white',
    padding: '8px',
    borderRadius: '9999px',
    border: 'none',
    cursor: 'pointer',
  },
};
