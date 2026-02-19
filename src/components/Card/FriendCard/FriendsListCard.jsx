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

export default function FriendsListCard({ friends, refreshFriends }) {
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
      refreshFriends(); // 목록 새로고침
    } catch (e) {
      alert('친구 삭제에 실패했습니다.');
    }
  };

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
        {isSearching ? (
          searchResult ? (
            <>
              <ResultBox>'{searchuserId}' 의 검색 결과입니다.</ResultBox>
              <NotFriendItem friend={searchResult} isSearchResult />
            </>
          ) : (
            <p>검색 결과가 없습니다.</p>
          )
        ) : friends.length === 0 ? (
          <p>친구가 없습니다.</p>
        ) : (
          friends.map((friend) => (
            <FriendItem
              key={friend.userId}
              friends={friend}
              onDelete={() => handleDeleteFriend(friend.userId)}
            />
          ))
        )}
      </List>
    </Card>
  );
}
