import { useNavigate } from 'react-router-dom';

export default function MenuCard() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        backgroundColor: 'white',
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
          onClick={() => console.log('유리병 보내기')}
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
          onClick={() => console.log('받은 유리병 보기')}
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
          <span
            style={{
              backgroundColor: '#ef4444',
              color: 'white',
              borderRadius: '9999px',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
            }}
          >
            1
          </span>
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
          <span
            style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#ef4444',
              borderRadius: '9999px',
            }}
          ></span>
        </button>
      </div>
    </div>
  );
}
