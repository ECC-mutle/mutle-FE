import BottleCard from './BottleCard';

export default function BottleList() {
  // 임시 데이터 (나중에 서버에서 받아올 정보들)
  const bottles = Array(6).fill({
    userId: '김영희',
    profileImg: 'https://via.placeholder.com/40',
    question: '겨울에 가장 듣고 싶은 노래',
    trackName: '그대 작은 나의 세상이 되어',
    artistName: '카더가든',
    artworkUrl: 'https://via.placeholder.com/40',
  });

  return (
    <div style={containerStyles.outer}>
      <h2 style={containerStyles.title}>받은 유리병 보기</h2>
      <hr />

      {/* 카드들이 모여있는 그리드 영역 (스크롤 가능) */}
      <div style={containerStyles.gridWrapper}>
        <div style={containerStyles.grid}>
          {bottles.map((item, idx) => (
            <BottleCard key={idx} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

const containerStyles = {
  outer: {
    backgroundColor: '#f8f9fa', // 이미지의 배경색
    borderRadius: '16px',
    border: '1px solid #ccc',
    width: '90%',
    margin: '20px auto',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  title: { textAlign: 'center', padding: '15px 0', margin: 0 },
  gridWrapper: {
    padding: '20px',
    maxHeight: '70vh', // 스크롤이 생기도록 높이 제한
    overflowY: 'auto', // 세로 스크롤 허용
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', // 자동 줄바꿈
    gap: '20px',
  },
};
