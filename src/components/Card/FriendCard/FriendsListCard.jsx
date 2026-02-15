import { useEffect, useState } from 'react';
import FriendItem from './FriendItem';
import { GetFriendList, SearchFriends } from '../../../api/friends';

import {
  Card,
  Header,
  SearchRow,
  Input,
  SearchButton,
  BackButton,
  ResultBox,
  List,
} from './FriendCard.style';

export default function FriendsListCard() {
  const [friends, setFriends] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');

  // 친구 목록 로딩
  {
    /* api 형식
    {
  "status": "string",
  "message": "string",
  "data": [
    {
      "id": 0,
      "nickname": "string",
      "profileImage": "string",
      "bio": "string",
      "repMusicInfo": {
        "trackName": "string",
        "artistName": "string",
        "artworkUrl60": "string"
      }
    }
  ]
}*/
  }
  useEffect(() => {
    if (!token) return;

    const fetchFriends = async () => {
      try {
        setLoading(true);
        const res = await GetFriendList(token);
        setFriends(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, [token]);

  // 친구 검색
  const handleSearch = async () => {
    if (!searchId) return;

    try {
      setLoading(true);
      setIsSearching(true);

      const result = await SearchFriends(token, {
        type: 'ID', // 또는 EMAIL
        userId: searchId,
      });

      setSearchResult(res.data);
    } catch (e) {
      console.error(e);
      alert('검색 실패');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setIsSearching(false);
    setSearchResult(null);
    setSearchId('');
  };

  return (
    <Card>
      <Header>
        <h2>친구 목록</h2>
        {isSearching && <BackButton onClick={handleBack}>목록으로</BackButton>}
      </Header>

      {!isSearching && (
        <SearchRow>
          <Input
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder='검색할 ID / 이메일'
          />
          <SearchButton onClick={handleSearch}>검색</SearchButton>
        </SearchRow>
      )}

      {loading && <p>로딩 중...</p>}

      {isSearching && searchResult && (
        <>
          <ResultBox>'{searchId}' 검색 결과</ResultBox>
          <FriendItem friend={searchResult} isSearchResult />
        </>
      )}

      {!isSearching && (
        <List>
          {friends.map((friend) => (
            <FriendItem key={friend.id} friend={friend} />
          ))}
        </List>
      )}
    </Card>
  );
}
