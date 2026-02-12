{
  /* 검색 결과의 친구 여부에 따른 상태 ="isSearchResult"로 관리 */
}
export default function FriendCard({
  friend,
  isSearchResult = false,
  onAddFriend,
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '16px',
        backgroundColor: 'white',
        borderRadius: '12px',
        border: isSearchResult ? '2px solid #e5e7eb' : '1px solid #e5e7eb',
        marginBottom: '12px',
      }}
    >
      {/* 프로필 이미지 */}
      <div
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'linear-gradient(to bottom right, #fb923c, #9333ea)',
          flexShrink: 0,
        }}
      ></div>

      {/* 친구 정보 */}
      <div style={{ flex: 1 }}>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: 'bold',
            margin: '0 0 4px 0',
          }}
        >
          {friend.name}
        </h3>
        <p
          style={{
            fontSize: '13px',
            color: '#6b7280',
            margin: 0,
          }}
        >
          {friend.status}
        </p>
      </div>

      {/* 음악 정보 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          backgroundColor: '#f9fafb',
          borderRadius: '8px',
          flex: 1,
        }}
      >
        <span style={{ fontSize: '14px' }}>🎵 {friend.currentSong}</span>
      </div>

      {/* 버튼 - 검색 결과면 다른 버튼 표시 */}
      <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
        {isSearchResult ? (
          <button
            onClick={() => onAddFriend && onAddFriend(friend)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#1f2937',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '500',
            }}
          >
            방문하기
          </button>
        ) : (
          <>
            <button
              onClick={() => console.log('방문하기:', friend.id)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#1f2937',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '500',
              }}
            >
              방문하기
            </button>
            <button
              onClick={() => console.log('친구 삭제:', friend.id)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '500',
              }}
            >
              친구 삭제
            </button>
          </>
        )}
      </div>
    </div>
  );
}
