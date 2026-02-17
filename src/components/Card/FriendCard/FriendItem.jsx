import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './FriendCard.style';
import DefaultProfileImg from '../../../assets/images/defaultProfile.png';

export default function FriendItem({
  friend, // 단일 객체 데이터 (로그 상의 그 객체)
  isSearchResult = false,
  onDelete,
}) {
  const navigate = useNavigate();

  // 데이터가 없을 때를 대비한 안전장치
  if (!friend) return null;

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (
      window.confirm(`${friend.nickname}님을 친구 목록에서 삭제하시겠습니까?`)
    ) {
      onDelete();
    }
  };

  const handleVisitClick = () => {
    const targetId = friend.userId || friend.id;
    if (targetId) {
      navigate(`/island/${targetId}`);
    } else {
      console.error('유저 ID를 찾을 수 없습니다.');
    }
  };

  return (
    <div style={itemContainerStyle}>
      {/* 1. 왼쪽: 프로필 사진 */}
      <img
        src={friend.profileImage || DefaultProfileImg}
        alt='profile'
        style={profileImageStyle}
      />

      {/* 2. 중앙 왼쪽: 닉네임과 Bio (프로필 옆에 밀착) */}
      <div style={infoWrapperStyle}>
        <span style={nicknameStyle}>{friend.nickname}</span>
        <span style={bioTextStyle}>{friend.bio || '자기소개가 없습니다.'}</span>
      </div>

      {/* 3. 중앙 오른쪽: 음악 배지 (데이터가 있을 때만 렌더링) */}
      {friend.repMusicInfo?.artistName && friend.repMusicInfo?.trackName && (
        <div style={musicBadgeStyle}>
          <span style={{ fontSize: '12px', marginRight: '6px' }}>🎵</span>
          <span style={{ fontSize: '13px', color: '#333' }}>
            {friend.repMusicInfo.artistName} - {friend.repMusicInfo.trackName}
          </span>
        </div>
      )}

      {/* 4. 오른쪽 끝: 액션 버튼 그룹 */}
      <div style={buttonGroupStyle}>
        <Button
          onClick={handleVisitClick}
          style={{ backgroundColor: 'black', color: 'white', border: 'none' }}
        >
          방문하기
        </Button>
        {!isSearchResult && (
          <Button
            onClick={handleDeleteClick}
            style={{
              backgroundColor: '#FF4D4D',
              color: 'white',
              border: 'none',
            }}
          >
            친구 삭제
          </Button>
        )}
      </div>
    </div>
  );
}

// --- 레이아웃을 사진과 똑같이 만드는 스타일 ---

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

const profileImageStyle = {
  width: '55px',
  height: '55px',
  borderRadius: '50%',
  marginRight: '15px', // 텍스트와의 간격
  objectFit: 'cover',
  border: '1px solid #F0F0F0',
};

const infoWrapperStyle = {
  flex: 1, // 남은 공간을 차지하여 음악 배지를 오른쪽으로 밀어냄
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start', // 텍스트 왼쪽 정렬
  gap: '4px',
};

const nicknameStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#333',
};

const bioTextStyle = {
  fontSize: '14px',
  color: '#888',
};

const musicBadgeStyle = {
  display: 'flex',
  alignItems: 'center',
  border: '1px solid #000',
  borderRadius: '25px',
  padding: '6px 18px',
  marginRight: '15px',
  backgroundColor: '#FFF',
  flexShrink: 0, // 배지 모양 찌그러짐 방지
};

const buttonGroupStyle = {
  display: 'flex',
  gap: '8px',
  flexShrink: 0,
};
