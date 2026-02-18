import React, { useState, useEffect } from 'react';
import { GetRecivedRequests } from '../api/friends';
import Header from '../components/Header/Header';
import NavigateCard from '../components/Card/NavigateCard';
import FriendsListCard from '../components/Card/FriendCard/FriendsListCard';
import MenuCard from '../components/Card/MenuCard';
import ReceivedRequestsCard from '../components/Card/FriendCard/ReceivedRequestsCard';

export default function Friends() {
  const [requestCount, setRequestCount] = useState(0);
  const [requests, setRequests] = useState([]); // 신청 목록 데이터 저장
  const [showRequestList, setShowRequestList] = useState(false);
  const token = localStorage.getItem('token');

  const fetchRequests = async () => {
    try {
      const res = await GetRecivedRequests(token);
      console.log('받은 신청 데이터:', res);

      const actualData = res.data || [];

      setRequests(actualData);
      setRequestCount(actualData.length); // 개수 업데이트 /
    } catch (error) {
      console.error('데이터 로딩 실패', error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        padding: '20px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{ flexShrink: 0 }}>
        <Header />
      </div>
      {/*  NavigateCard */}
      <div style={{ flexShrink: 0, marginTop: '12px', marginBottom: '12px' }}>
        <NavigateCard
          requestCount={requestCount}
          onToggleList={() => setShowRequestList(!showRequestList)}
          isListView={showRequestList}
        />
      </div>
      {/* 메인 컨텐츠 영역 */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          gap: '20px',
          minHeight: 0,
        }}
      >
        {/* 왼쪽: 친구 목록 */}
        <div
          style={{
            flex: 1,
            minHeight: 0,
          }}
        >
          {showRequestList ? (
            /* 두 번째 사진 UI: requests 데이터를 넘겨줌 */
            <ReceivedRequestsCard
              requests={requests}
              onBack={() => setShowRequestList(false)}
              refresh={fetchRequests} // 수락/거절 후 목록 갱신용
            />
          ) : (
            <FriendsListCard />
          )}
        </div>

        {/* 오른쪽: 메뉴 */}
        <div
          style={{
            width: '280px',
            flexShrink: 0,
          }}
        >
          <MenuCard requestCount={requestCount} />
        </div>
      </div>
    </div>
  );
}
