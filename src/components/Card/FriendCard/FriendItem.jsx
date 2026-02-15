import {
  Item,
  Profile,
  Info,
  Name,
  Status,
  Song,
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
      <Button>방문하기</Button>
      <Button>친구 추가</Button>{' '}
      {/*친구 삭제 라고 피그마에 적혀있는데 여기는 친구가 아닌 사람들의 리스트임. */}
    </Item>
  );
}
