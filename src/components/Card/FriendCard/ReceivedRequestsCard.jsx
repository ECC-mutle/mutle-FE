import React from 'react';
import { HandleFriendRequest } from '../../../api/friends';
import DefaultProfileImg from '../../../assets/images/defaultProfile.png';

export default function ReceivedRequestsCard({ requests, onBack, refresh }) {
  console.log('받은 신청 데이터 원본:', requests);
  const token = localStorage.getItem('token');

  const onHandleAction = async (requestId, status) => {
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
        <backButtonStyle onClick={onBack} style={{ backgroundColor: '#ccc' }}>
          목록으로 돌아가기
        </backButtonStyle>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {requests.length === 0 ? (
          <p style={emptyTextStyle}>새로운 친구 신청이 없습니다.</p>
        ) : (
          requests.map((request) => (
            <div key={request.friendRequestId} style={itemContainerStyle}>
              {/* 왼쪽: 프로필 */}
              <img
                src={request.profileImage || DefaultProfileImg}
                alt='profile'
                style={profileImageStyle}
              />

              {/* 중앙: 정보 */}
              <div style={infoWrapperStyle}>
                <span style={nicknameStyle}>{request.nickname}</span>
                <span style={bioTextStyle}>{request.bio || '   '}</span>
              </div>

              {request.repMusicInfo?.artistName &&
                request.repMusicInfo?.trackName && (
                  <div style={musicBadgeStyle}>
                    <span style={{ fontSize: '12px', marginRight: '6px' }}>
                      🎵
                    </span>
                    <span style={{ fontSize: '13px', color: '#333' }}>
                      {request.repMusicInfo.artistName} -{' '}
                      {request.repMusicInfo.trackName}
                    </span>
                  </div>
                )}

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
                  onClick={() =>
                    onHandleAction(request.friendRequestId, 'REJECTED')
                  } // 서버 상태명 확인
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

const profileImageStyle = {
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  marginRight: '15px',
  objectFit: 'cover',
};

const bioStyle = {
  color: '#999',
  fontSize: '13px',
  margin: 0,
};

const buttonGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
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
  width: '60px',
};

const emptyTextStyle = {
  textAlign: 'center',
  color: '#BBB',
  marginTop: '40px',
};

const infoWrapperStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  textAlign: 'left',
  gap: '4px',
};

const nicknameStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#333',
  display: 'block',
};

const bioTextStyle = {
  fontSize: '14px',
  color: '#888',
  display: 'block',
};

const itemContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '12px 25px',
  border: '1px solid #EEE',
  borderRadius: '60px',
  marginBottom: '15px',
  backgroundColor: '#FFF',
  width: '100%',
  boxSizing: 'border-box',
};

const musicBadgeStyle = {
  display: 'flex',
  alignItems: 'center',
  border: '1px solid #CCC',
  borderRadius: '20px',
  padding: '6px 15px',
  marginRight: '15px',
  flexShrink: 0,
};
