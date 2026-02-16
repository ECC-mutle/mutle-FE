import React from 'react';
import { HandleFriendRequest } from '../../../api/friends';

export default function ReceivedRequestsCard({ requests, onBack, refresh }) {
  console.log('받은 신청 데이터 원본:', requests);
  const token = localStorage.getItem('token');

  const onHandleAction = async (requestId, status) => {
    // status는 서버 명세에 맞게 'ACCEPTED' 또는 'REJECTED' 등으로 전달
    const confirmMessage =
      status === 'ACCEPTED'
        ? '친구 신청을 수락하시겠습니까?'
        : '친구 신청을 거절하시겠습니까?';

    if (!window.confirm(confirmMessage)) return;

    try {
      await HandleFriendRequest(token, requestId, status);
      alert(
        status === 'ACCEPTED'
          ? '친구 신청이 수락되었습니다.'
          : '신청을 거절했습니다.',
      );

      // 부모 컴포넌트(Friends.js)의 fetchRequests를 실행시켜
      // 알림 버튼 숫자와 목록을 최신화합니다.
      refresh();
    } catch (error) {
      alert('처리에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>
          받은 친구 신청 목록
        </h2>
        <button onClick={onBack} style={backButtonStyle}>
          목록으로 돌아가기
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {requests.length === 0 ? (
          <p style={emptyTextStyle}>새로운 친구 신청이 없습니다.</p>
        ) : (
          requests.map((request) => (
            <div key={request.friendRequestId} style={itemContainerStyle}>
              {/* 왼쪽: 프로필 */}
              <img
                src={request.profileImage || 'https://via.placeholder.com/50'}
                alt='profile'
                style={profileImageStyle}
              />

              {/* 중앙: 정보 */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '4px',
                  }}
                >
                  <span style={{ fontWeight: 'bold' }}>
                    {request.nickname || '익명'}
                  </span>
                  <div style={musicBadgeStyle}>
                    🎵 {request.repMusicInfo.artistName} -{' '}
                    {request.repMusicInfo.trackName}
                  </div>
                </div>
                <p style={bioStyle}>{request.bio || '자기소개가 없습니다.'}</p>
              </div>

              {/* 오른쪽: 액션 버튼 */}
              <div style={buttonGroupStyle}>
                <button
                  onClick={() =>
                    onHandleAction(request.friendRequestId, 'ACCEPTED')
                  } // 서버 상태명 확인
                  style={{ ...actionButtonStyle, backgroundColor: '#4A90E2' }}
                >
                  수락
                </button>
                <button
                  onClick={() => onHandleAction(request.id, 'REJECTED')} // 서버 상태명 확인
                  style={{ ...actionButtonStyle, backgroundColor: '#FF6B6B' }}
                >
                  거절
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// --- Styles ---
const containerStyle = {
  backgroundColor: 'white',
  borderRadius: '15px',
  padding: '24px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
};

const backButtonStyle = {
  backgroundColor: '#E0E0E0',
  border: 'none',
  padding: '6px 16px',
  borderRadius: '20px',
  cursor: 'pointer',
  fontSize: '13px',
};

const itemContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '15px 20px',
  border: '1px solid #EEEEEE',
  borderRadius: '40px',
  marginBottom: '12px',
};

const profileImageStyle = {
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  marginRight: '15px',
  objectFit: 'cover',
};

const musicBadgeStyle = {
  border: '1px solid #E0E0E0',
  borderRadius: '12px',
  padding: '2px 8px',
  fontSize: '11px',
  color: '#777',
};

const bioStyle = {
  color: '#999',
  fontSize: '13px',
  margin: 0,
};

const buttonGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  marginLeft: '10px',
};

const actionButtonStyle = {
  border: 'none',
  color: 'white',
  padding: '4px 12px',
  borderRadius: '8px',
  fontSize: '12px',
  cursor: 'pointer',
  fontWeight: '600',
};

const emptyTextStyle = {
  textAlign: 'center',
  color: '#BBB',
  marginTop: '40px',
};
