import { useNavigate } from 'react-router-dom';

export default function MusicCard({ repMusic, platforms, onEdit }) {
  // repMusic: { trackName, artistName, artworkUrl160 } 또는 null
  const trackName = repMusic?.trackName || '곡 없음';
  const artistName = repMusic?.artistName || '아티스트 없음';
  const artworkUrl = repMusic?.artworkUrl160 || '텅';
  const navigate = useNavigate();

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
      {/* 🔗 플랫폼 버튼들 */}
      <div style={styles.buttonGroup}>
        {platforms?.map((platform) => {
          return (
            <button
              key={platform.platformName}
              style={styles.platformButton}
              onClick={() =>
                console.log(
                  `플랫폼 이름:${platform.platformName} 
                  아이디: ${platform.platformNickname}`,
                )
              }
            >
              {platform.platformName} · {platform.platformNickname}
            </button>
          );
        })}
      </div>
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
