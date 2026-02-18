import { useEffect, useState } from 'react';
import FriendItem from './FriendItem';
import NotFriendItem from './NotFriendItem';
import DefaultProfileImg from '../../../assets/images/defaultProfile.png';

import {
  GetFriendList,
  SearchFriends,
  DelteFriend,
} from '../../../api/friends';

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
  const [searchuserId, setSearchuserId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');

  //친구 삭제 처리 함수
  const handleDeleteFriend = async (friendId) => {
    if (!token) return;

    try {
      await DelteFriend(token, friendId);
      alert('친구 삭제가 완료되었습니다.');
      fetchFriends(); // 목록 새로고침
    } catch (e) {
      alert('친구 삭제에 실패했습니다.');
    }
  };

  const fetchFriends = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const res = await GetFriendList(token);
      setFriends(res.data || []);
    } catch (e) {
      console.error('친구 목록 로딩 실패:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, [token]);

  // 친구 검색
  const handleSearch = async () => {
    if (!searchuserId.trim()) return;

    try {
      setLoading(true);
      setIsSearching(true);

      const result = await SearchFriends(token, {
        type: 'ID',
        userId: searchuserId,
      });

      setSearchResult(result.data);
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
    setSearchuserId('');
    setLoading(false);
  };

  return (
    <Card>
      <Header>
        <h2>친구 목록</h2>
        {isSearching && (
          <SearchButton
            onClick={handleBack}
            style={{ backgroundColor: '#ccc' }}
          >
            목록으로 돌아가기
          </SearchButton>
        )}
      </Header>

      {/* 검색창: 검색 중이 아닐 때만 노출 */}
      {!isSearching && (
        <SearchRow>
          <Input
            value={searchuserId}
            onChange={(e) => setSearchuserId(e.target.value)}
            placeholder='검색할 ID / 이메일을 입력하세요'
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <SearchButton onClick={handleSearch}>검색하기</SearchButton>
        </SearchRow>
      )}

      {loading && <p>로딩 중...</p>}

      <List>
        {isSearching && searchResult ? (
          <>
            <ResultBox>'{searchuserId}' 의 검색 결과입니다.</ResultBox>
            {/* 검색된 유저는 친구가 아닐 수 있으므로 NotFriendItem 사용 */}
            <NotFriendItem friend={searchResult} isSearchResult />
          </>
        ) : (
          /* CASE 2: 기존 친구 목록 표시 (검색 중이 아닐 때) */
          !isSearching &&
          friends.map((friend) => (
            <FriendItem
              key={friend.userId}
              friends={friend}
              onDelete={() => {
                console.log('삭제하려는 ID:', friend.userId);
                handleDeleteFriend(friend.userId);
              }}
              // 친구 목록에서는 '방문하기'와 '친구 삭제' 버튼이 모두 필요함
            />
          ))
        )}
      </List>
    </Card>
  );
}
