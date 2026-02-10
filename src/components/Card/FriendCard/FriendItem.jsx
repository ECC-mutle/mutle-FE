import {
  Item,
  Profile,
  Info,
  Name,
  Status,
  Song,
  ButtonGroup,
  Button,
} from './FriendCard.style';

export default function FriendItem({ friend, isSearchResult = false }) {
  return (
    <Item isSearchResult={isSearchResult}>
      <Profile src={friend.profileImage} />

      <Info>
        <Name>{friend.nickname}</Name>
        <Status>{friend.bio}</Status>
      </Info>

      {friend.repMusicInfo && (
        <Song>
          <img src={friend.repMusicInfo.artworkUrl60} alt={`앨범커버`} />
          🎵 {friend.repMusicInfo.trackName} - {friend.repMusicInfo.artistName}
        </Song>
      )}

      <ButtonGroup>
        <Button>방문하기</Button>
        <Button>친구 삭제</Button>
      </ButtonGroup>
    </Item>
  );
}
