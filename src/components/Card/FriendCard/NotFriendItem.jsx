import { useNavigate } from 'react-router-dom';
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
  //const defaultImage = '/default-profile.png'; 기본이미지

  const handleVisit = () => {
    console.log('검색된 유저 데이터:', friend);
    const targetId = friend.userId;
    if (!targetId) {
      alert('유저 ID 정보를 찾을 수 없습니다.');
      return;
    }

    navigate(`/island/${targetId}`);
  };

  return (
    <Item isSearchResult={isSearchResult}>
      <Profile src={friend.profileImage} />
      <Info>
        <Name>{friend.nickname}</Name>
        <Status>{friend.bio}</Status>
      </Info>
      <RightSection>
        {friend.repMusicInfo && (
          <Song>
            <span>♫</span>
            <span>
              <img src={friend.repMusicInfo.artworkUrl60} alt={`앨범커버`} />
              🎵 {friend.repMusicInfo.trackName} -{' '}
              {friend.repMusicInfo.artistName}
            </span>
          </Song>
        )}
        <Button onClick={handleVisit}>방문하기</Button>{' '}
      </RightSection>
    </Item>
  );
}
