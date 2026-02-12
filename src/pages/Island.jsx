import Header from '../components/Header/Header';
import ProfileCard from '../components/Card/ProfileCard';
import MusicCard from '../components/Card/MusicCard';
import CalendarCard from '../components/Card/CalendarCard';
import MenuCard from '../components/Card/MenuCard';
import NavigateCard from '../components/Card/NavigateCard';

export default function Island() {
  return (
    <div
      style={{
        height: '100vh',

        width: '100vw',
        padding: '20px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header />
      <div style={{ flexShrink: 0, marginTop: '15px', marginBottom: '15px' }}>
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
        {/* 왼쪽+중앙 영역 */}
        <div
          style={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          {/* 상단: 프로필 + 음악 카드 */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '24px',
            }}
          >
            <ProfileCard />
            <MusicCard />
          </div>

          {/* 하단: 캘린더 */}
          <CalendarCard />
        </div>

        {/* 오른쪽: 메뉴 */}
        <div
          style={{
            width: '350px',
            flexShrink: 0,
          }}
        >
          <MenuCard />
        </div>
      </div>
    </div>
  );
}
