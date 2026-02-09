import { useNavigate } from 'react-router-dom';

export default function MeCard() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '32px',
        boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
      }}
    >
      {/* 헤더 */}
      <div
        style={{
          fontSize: '16px',
          color: '#6b7280',
          marginBottom: '24px',
        }}
      >
        환경설정
      </div>

      {/* 제목 */}
      <h2
        style={{
          fontSize: '28px',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '32px',
        }}
      >
        계정 정보
      </h2>

      {/* 설정 항목들 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <SettingItem
          title='프로필 수정'
          description='닉네임, 프로필 사진 변경'
        />

        <SettingItem title='로그아웃' description='계정에서 로그아웃' />
        <SettingItem
          title='회원 탈퇴'
          description='계정 영구 삭제'
          isDanger={true}
        />
      </div>
    </div>
  );
}

// 설정 항목 컴포넌트
function SettingItem({ title, description, isDanger = false }) {
  return (
    <button
      onClick={() => console.log(`${title} 클릭`)}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#f9fafb',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
      }}
    >
      <div style={{ textAlign: 'left' }}>
        <div
          style={{
            fontSize: '16px',
            fontWeight: '600',
            color: isDanger ? '#ef4444' : '#1f2937',
            marginBottom: '4px',
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: '13px',
            color: '#6b7280',
          }}
        >
          {description}
        </div>
      </div>
      <span style={{ fontSize: '18px', color: '#9ca3af' }}>›</span>
    </button>
  );
}
