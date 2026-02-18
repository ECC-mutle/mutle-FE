import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import DefaultProfileImg from '../../../assets/images/defaultProfile.png';

import {
  Item,
  Profile,
  Info,
  Name,
  Status,
  Song,
  Button,
  RightSection,
} from './FriendCard.style';

export default function NotFriendItem({ friend, isSearchResult = false }) {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('현재 렌더링된 친구 데이터:', friend);
  }, [friend]);

  const handleVisit = () => {
    const targetId = friend.userId;
    if (!targetId) {
      alert('유저 ID 정보를 찾을 수 없습니다.');
      return;
    }
    navigate(`/island/${targetId}`);
  };
  const profileSrc =
    friend.profileImage && friend.profileImage.trim() !== ''
      ? friend.profileImage
      : DefaultProfileImg;
  console.log('최종 결정된 이미지 경로:', profileSrc);
  return (
    <Item isSearchResult={isSearchResult}>
      <Profile
        src={profileSrc}
        alt='profile'
        onError={(e) => {
          e.target.src = DefaultProfileImg;
        }}
      />
      <Info>
        <Name>{friend.nickname}</Name>
        <Status>{friend.bio}</Status>
      </Info>
      <RightSection>
        {friend.repMusicInfo && (
          <Song>
            <img src={friend.repMusicInfo.artworkUrl60} alt={`앨범커버`} />
            <div className='music-info'>
              <div className='trackName'>{friend.repMusicInfo.trackName}</div>
              <div className='artistName'>{friend.repMusicInfo.artistName}</div>
            </div>
          </Song>
        )}
      </RightSection>
      <Button onClick={handleVisit}>방문하기</Button>{' '}
    </Item>
  );
}
