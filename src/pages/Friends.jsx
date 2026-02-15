import Header from '../components/Header/Header';
import NavigateCard from '../components/Card/NavigateCard';
import FriendsListCard from '../components/Card/FriendCard/FriendsListCard';
import MenuCard from '../components/Card/MenuCard';

export default function Friends() {
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
        <NavigateCard />
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
          <FriendsListCard />
        </div>

        {/* 오른쪽: 메뉴 */}
        <div
          style={{
            width: '280px',
            flexShrink: 0,
          }}
        >
          <MenuCard />
        </div>
      </div>
    </div>
  );
}