import { useNavigate } from 'react-router-dom';
import React from 'react';

export default function NavigateCard({
  requestCount,
  onToggleList,
  isListView,
}) {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center', // 가로 중앙 정렬
        alignItems: 'center', // 세로 중앙 정렬
        gap: '16px',
        marginBottom: '24px',
        position: 'relative', // 기준점 설정
      }}
    >
      <button onClick={() => navigate('/island')}>홈</button>

      {/* 버튼이 나타날 공간 */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        {requestCount > 0 && !isListView && (
          <button
            onClick={onToggleList}
            style={{
              backgroundColor: '#FF6B6B',
              color: 'white',
              borderRadius: '20px',
              padding: '8px 20px',
              border: 'none',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              whiteSpace: 'nowrap', // 텍스트 줄바꿈 방지
            }}
          >
            새로운 친구 신청 {requestCount}개!
          </button>
        )}
      </div>

      <button onClick={() => navigate('/me')}>환경 설정</button>
    </div>
  );
}
