export default function MusicCard() {
  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '24px',
        boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '16px',
          marginBottom: '16px',
        }}
      ></div>

      <div
        style={{
          border: '2px solid #d1d5db',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '16px',
        }}
      >
        <p
          style={{
            fontWeight: 'bold',
            marginBottom: '8px',
          }}
        >
          🎵 재생 중인 음악
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#d1d5db',
              borderRadius: '4px',
            }}
          ></div>
          <p style={{ fontSize: '14px' }}>그대 작은 나의 세상이 되어</p>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <button
          onClick={() => console.log('Spotify 클릭')}
          style={{
            width: '100%',
            backgroundColor: '#16a34a',
            color: 'white',
            padding: '8px',
            borderRadius: '9999px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Spotify에서 열기
        </button>
        <button
          onClick={() => console.log('Apple Music 클릭')}
          style={{
            width: '100%',
            backgroundColor: 'black',
            color: 'white',
            padding: '8px',
            borderRadius: '9999px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          APPLE MUSIC에서 열기
        </button>
      </div>
    </div>
  );
}
