import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const PLATFORM_OPTIONS = [
  'SPOTIFY',
  'APPLE MUSIC',
  'MELON',
  'YOUTUBE MUSIC',
  'SOUNDCLOUD',
];

import spotifyLogo from '../../assets/images/PLATFORM_LOGOS/spotifyLogo.png';
import appleLogo from '../../assets/images/PLATFORM_LOGOS/appleLogo.png';
import melonLogo from '../../assets/images/PLATFORM_LOGOS/melonLogo.png';
import youtubeLogo from '../../assets/images/PLATFORM_LOGOS/youtubeLogo.png';
import soundcloudLogo from '../../assets/images/PLATFORM_LOGOS/soundcloudLogo.png';

const PLATFORM_LOGOS = {
  SPOTIFY: spotifyLogo,
  APPLE_MUSIC: appleLogo,
  MELON: melonLogo,
  YOUTUBE_MUSIC: youtubeLogo,
  SOUNDCLOUD: soundcloudLogo,
};
export default function MusicCard({ repMusic, platforms, handleAddPlatform }) {
  // repMusic: { trackName, artistName, artworkUrl60 } 또는 null
  const trackName = repMusic?.trackName || '곡 없음';
  const artistName = repMusic?.artistName || '아티스트 없음';
  const artworkUrl = repMusic?.artworkUrl60 || '텅';
  const navigate = useNavigate();

  const [showPlatformInput, setShowPlatformInput] = useState(false);
  const [newPlatformName, setNewPlatformName] = useState('');
  const [newPlatformNickname, setNewPlatformNickname] = useState('');

  // 수정을 위해 기존 데이터를 input에 채우고 창을 여는 함수
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
    const formattedName = newPlatformName.replace(/\s+/g, '').toUpperCase();
    await handleAddPlatform(newPlatformName, newPlatformNickname);

    // 성공 후 입력창 닫기 및 초기화
    setShowPlatformInput(false);
    setNewPlatformName('');
    setNewPlatformNickname('');
  };

  const getPlatformIcon = (platformName) => {
    // 공백을 언더바로 변환해서 매핑 객체에서 찾음
    const key = platformName?.replace(/\s+/g, '_').toUpperCase();
    return PLATFORM_LOGOS[key] || '🔗'; // 없으면 기본 아이콘
  };
  return (
    <div style={styles.card}>
      <div style={styles.topArea}></div>

      <div style={styles.nowPlayingBox}>
        <p style={styles.title}>🎵 재생 중인 음악</p>
        <div style={styles.musicRow}>
          <img src={artworkUrl} style={styles.albumArt} alt='album art' />
          <div>
            <p style={styles.trackName}>{trackName}</p>
            <p style={styles.artistName}>{artistName}</p>
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate('/search-music-island')}
        style={styles.editMusicBtn}
      >
        🔍 음악 수정
      </button>

      {/* 🔗 플랫폼 버튼 영역 - 로고 강조형 */}
      <div style={styles.buttonGroup}>
        {platforms && platforms.length > 0 ? (
          <button style={styles.platformButton} onClick={handleEditClick}>
            <div style={styles.platformContent}>
              <img
                src={getPlatformIcon(platforms[0].platformName)}
                alt='platform logo'
                style={styles.largeLogo}
              />
              <span style={styles.platformNickname}>
                {platforms[0].platformNickname}
              </span>
            </div>
          </button>
        ) : (
          <div
            style={styles.emptyCard}
            onClick={() => setShowPlatformInput(true)}
          >
            <p style={{ color: '#888' }}>
              아직 아무것도 없어요 (클릭해서 추가)
            </p>
          </div>
        )}
      </div>

      {/* 입력창 영역 - 선택 버튼들도 로고 위주로 */}
      {showPlatformInput && (
        <div style={styles.inputBox}>
          <p
            style={{
              fontSize: '14px',
              marginBottom: '12px',
              fontWeight: 'bold',
            }}
          >
            플랫폼 선택
          </p>
          <div style={styles.platformSelector}>
            {PLATFORM_OPTIONS.map((name) => {
              const platformKey = name.replace(/\s+/g, '_').toUpperCase();
              const isSelected =
                newPlatformName.replace(/\s+/g, '_').toUpperCase() ===
                platformKey;

              return (
                <button
                  key={name}
                  type='button'
                  onClick={() => setNewPlatformName(name)}
                  style={{
                    ...styles.selectorButton,
                    border: isSelected ? '2px solid #007AFF' : '1px solid #ddd',
                    backgroundColor: isSelected ? '#F0F7FF' : 'white',
                  }}
                >
                  <img
                    src={PLATFORM_LOGOS[platformKey]}
                    style={styles.miniLogo}
                    alt={name}
                  />
                  <span style={{ fontSize: '10px', marginTop: '4px' }}>
                    {name}
                  </span>
                </button>
              );
            })}
          </div>

          <input
            placeholder='닉네임을 입력해주세요'
            value={newPlatformNickname}
            onChange={(e) => setNewPlatformNickname(e.target.value)}
            style={styles.textInput}
          />

          <div style={styles.actionButtons}>
            <button onClick={onConfirm} style={styles.confirmBtn}>
              {platforms && platforms.length > 0 ? '수정 완료' : '추가'}
            </button>
            <button
              onClick={() => setShowPlatformInput(false)}
              style={styles.cancelBtn}
            >
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: 'white',
    borderRadius: '16px', // 더 둥글게
    padding: '24px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
    width: '100%',
    boxSizing: 'border-box',
  },
  nowPlayingBox: {
    border: '1px solid #eee', // 선을 더 연하게
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '12px',
    backgroundColor: '#fafafa',
  },
  editMusicBtn: {
    width: '100%',
    padding: '8px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    backgroundColor: 'white',
    cursor: 'pointer',
    marginBottom: '20px',
    fontSize: '13px',
  },
  platformButton: {
    width: '100%',
    height: '80px', // 버튼 높이를 늘림
    backgroundColor: '#111', // 검은색 배경 유지
    color: 'white',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  platformContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',
  },
  largeLogo: {
    width: '40px', // 로고를 큼직하게
    height: '40px',
    objectFit: 'contain',
    borderRadius: '8px',
  },
  platformNickname: {
    fontSize: '18px',
    fontWeight: '600',
  },
  platformSelector: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)', // 5개를 가로로 쫙 배치
    gap: '8px',
    marginBottom: '15px',
  },
  selectorButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px 5px',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  miniLogo: {
    width: '24px',
    height: '24px',
    objectFit: 'contain',
  },
  textInput: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    marginBottom: '12px',
    boxSizing: 'border-box',
  },
  // ... (나머지 confirmBtn, cancelBtn 스타일은 기존과 동일)
};
