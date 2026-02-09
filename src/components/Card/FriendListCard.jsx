import { useState } from 'react';
import FriendCard from './FriendCard';

export default function FriendsListCard() {
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [friends, setFriends] = useState([
    // 더미 데이터 (그냥 텍스트)
    {
      id: 1,
      name: '가을',
      status: '한 줄로 작성한 자기소개',
      currentSong: 'IVE - REBEL HEART',
    },
    {
      id: 2,
      name: '안유진',
      status: '한 줄로 작성한 자기소개',
      currentSong: 'IVE - REBEL HEART',
    },
    {
      id: 3,
      name: '리즈',
      status: '한 줄로 작성한 자기소개',
      currentSong: 'IVE - REBEL HEART',
    },
  ]);

  // 검색 관리
  const handleSearch = () => {
    console.log('검색:', searchId);
    setIsSearching(true);

    // settime으로 잠깐 기다린 후 더미 데이터가 나오고 있음
    // 실제로는 API 호출을 해서 검색한 id에 해당하는 유저가 나오게 조정 필요
    setTimeout(() => {
      setSearchResult({
        id: 'ID123456',
        name: '고양이',
        status: '한 줄로 작성한 자기소개',
        currentSong: '데이먼스 이어 - josee!',
      });
    }, 500);
  };

  const handleAddFriend = (friend) => {
    console.log('친구 추가:', friend);
    // TODO: API 호출
    setSearchResult(null);
    setSearchId('');
    setIsSearching(false);
  };

  const handleBackToList = () => {
    setIsSearching(false);
    setSearchResult(null);
    setSearchId('');
  };

  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 헤더 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
          친구 목록
        </h2>

        {/* 목록으로 돌아가기 버튼 */}
        {isSearching && (
          <button
            onClick={handleBackToList}
            style={{
              padding: '8px 16px',
              backgroundColor: '#e5e7eb',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            목록으로 돌아가기
          </button>
        )}
      </div>

      {/* 검색 영역 */}
      {!isSearching && (
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <input
            type='text'
            placeholder='검색할 ID / 이메일을 입력하세요'
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            style={{
              flex: 1,
              padding: '12px 16px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              padding: '12px 24px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              whiteSpace: 'nowrap',
            }}
          >
            검색하기
          </button>
        </div>
      )}

      {/* 검색 결과 */}
      {isSearching && searchResult && (
        <div style={{ flex: 1 }}>
          <div
            style={{
              padding: '16px',
              backgroundColor: '#f0f9ff',
              borderRadius: '8px',
              marginBottom: '24px',
              textAlign: 'center',
              color: '#3b82f6',
              fontSize: '14px',
              borderTop: '2px dotted #93c5fd',
              borderBottom: '2px dotted #93c5fd',
            }}
          >
            '{searchResult.id}' 의 검색 결과입니다.
          </div>

          {/* 같은 FriendCard 재사용! */}
          <FriendCard
            friend={searchResult}
            isSearchResult={true}
            onAddFriend={handleAddFriend}
          />
        </div>
      )}

      {/* 친구 리스트 */}
      {!isSearching && (
        <div style={{ flex: 1, overflowY: 'auto', paddingRight: '8px' }}>
          {friends.map((friend) => (
            <FriendCard key={friend.id} friend={friend} />
          ))}
        </div>
      )}
    </div>
  );
}
