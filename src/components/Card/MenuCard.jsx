import { useNavigate } from 'react-router-dom';

export default function MenuCard({ requestCount }) {
  const navigate = useNavigate();
  const styles = {
    badge: {
      backgroundColor: '#FF6B6B',
      color: 'white',
      borderRadius: '50%',
      width: '20px',
      height: '20px',
      fontSize: '12px',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
  };
  return (
    <div
      style={{
        backgroundColor: '#FAF9F8',
        borderRadius: '8px',
        padding: '24px',
        boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
      }}
    >
      <h3
        style={{
          fontSize: '20px',
          fontWeight: 'bold',
          marginBottom: '16px',
        }}
      >
        메뉴
      </h3>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <button
          onClick={() => navigate('/bottles/bottles')}
          style={{
            width: '100%',
            textAlign: 'left',
            padding: '12px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: 'transparent',
            cursor: 'pointer',
          }}
        >
          ≡ 유리병 보내기
        </button>
        <button
          onClick={() => navigate('/bookmarks')}
          style={{
            width: '100%',
            textAlign: 'left',
            padding: '12px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>≡ 받은 유리병 보기</span>
        </button>
        <button
          onClick={() => navigate('/friends')}
          style={{
            width: '100%',
            textAlign: 'left',
            padding: '12px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>≡ 친구 관리</span>
          {requestCount > 0 && <span style={styles.badge}>{requestCount}</span>}
        </button>
      </div>
    </div>
  );
}
