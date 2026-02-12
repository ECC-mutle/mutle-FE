import MeCard from '../../components/Card/MeCard/MeCard';
import NavigateCard from '../../components/Card/NavigateCard';
import MenuCard from '../../components/Card/MenuCard';
import Header from '../../components/Header/Header';
{
  /* api 함수, modal 등은 Component나 Card 폴더로 빠져있음, 수정 원하면 해당 페이지 참고 */
}
export default function Me() {
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
      <Header />
      <div style={{ flexShrink: 0, marginTop: '15px', marginBottom: '15px' }}>
        <NavigateCard />
      </div>

      {/* 전체 레이아웃 정의 (카드 배치 조정용) */}
      <div
        style={{
          display: 'flex',
          gap: '24px',
        }}
      >
        {/* 왼쪽: MeCard - 남은 공간 전부 차지 */}
        <div
          style={{
            flex: 1,
            minHeight: 0,
          }}
        >
          <MeCard />
        </div>
        {/* 오른쪽: MenuCard - 고정 너비 */}
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
