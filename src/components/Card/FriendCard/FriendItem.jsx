import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Item,
  Profile,
  Info,
  Name,
  Status,
  Song,
  Button,
} from './FriendCard.style';

export default function FriendItem({
  friend,
  isSearchResult = false,
  onDelete,
}) {
  const navigate = useNavigate();

  const handleDeleteClick = () => {
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
    // 기존에 정의된 스타일 컴포넌트들을 그대로 사용
    <Item>
      <Profile src={friend.profileImage || 'default-image.png'} />
      <Info>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Name>{friend.nickname}</Name>
          {friend.repMusicInfo && (
            <Song>
              🎵 {friend.repMusicInfo.artistName} -{' '}
              {friend.repMusicInfo.trackName}
            </Song>
          )}
        </div>
        <Status>{friend.bio}</Status>
      </Info>

      <div style={{ display: 'flex', gap: '8px', marginLeft: '12px' }}>
        <Button
          onClick={handleVisitClick}
          style={{ backgroundColor: 'black', color: 'white' }}
        >
          방문하기
        </Button>
        {!isSearchResult && (
          <Button
            onClick={handleDeleteClick}
            style={{ backgroundColor: '#FF4D4D', color: 'white' }}
          >
            친구 삭제
          </Button>
        )}
      </div>
    </Item>
  );
}
