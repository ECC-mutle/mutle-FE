import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function MusicCard({ repMusic, platforms, handleAddPlatform }) {
  // repMusic: { trackName, artistName, artworkUrl60 } 또는 null
  const trackName = repMusic?.trackName || '곡 없음';
  const artistName = repMusic?.artistName || '아티스트 없음';
  const artworkUrl = repMusic?.artworkUrl60 || '텅';
  const navigate = useNavigate();

  const [showPlatformInput, setShowPlatformInput] = useState(false);
  const [newPlatformName, setNewPlatformName] = useState('');
  const [newPlatformNickname, setNewPlatformNickname] = useState('');

  // ✅ 수정을 위해 기존 데이터를 input에 채우고 창을 여는 함수
  const handleEditClick = () => {
    if (platforms && platforms.length > 0) {
      setNewPlatformName(platforms[0].platformName);
      setNewPlatformNickname(platforms[0].platformNickname);
      setShowPlatformInput(true);
    }
  };

  // 2. 자식 내부의 전용 핸들러 (입력값 전달용)
  const onConfirm = async () => {
    // 부모가 내려준 함수를 호출하며 입력값 두 개를 전달
    await handleAddPlatform(newPlatformName, newPlatformNickname);

    // 성공 후 입력창 닫기 및 초기화
    setShowPlatformInput(false);
    setNewPlatformName('');
    setNewPlatformNickname('');
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
      <button onClick={() => navigate('/search-music-island')}>
        {' '}
        {}
        🔍 음악 수정
      </button>

      {/* 🔗 플랫폼 버튼 */}
      <div style={styles.buttonGroup}>
        {platforms && platforms.length > 0 ? (
          /* 버튼을 누르면 handleEditClick 실행 */
          <button style={styles.platformButton} onClick={handleEditClick}>
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

      {/* 입력창 영역 */}
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
          <button onClick={onConfirm}>
            {platforms && platforms.length > 0 ? '수정 완료' : '추가'}
          </button>
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
