import { useNavigate } from 'react-router-dom';

export default function NavigateCard() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '16px',
        marginBottom: '24px',
      }}
    >
      <button
        type='button'
        onClick={() => {
          navigate('/island');
        }}
      >
        홈
      </button>

      <button
        type='button'
        onClick={() => {
          navigate('/me');
        }}
      >
        환경 설정
      </button>
    </div>
  );
}
