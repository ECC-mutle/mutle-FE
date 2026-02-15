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
  //const defaultImage = '/default-profile.png'; 기본이미지

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
        <Button>방문하기</Button>{' '}
      </RightSection>
    </Item>
  );
}
