import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import MenuCard from '../../components/Card/MenuCard';
import NavigateCard from '../../components/Card/NavigateCard';
import BottleCard from '../../components/Card/BottleCard';
import { GetBookmarkList } from '../../api/bottles';

const styles = {
  container: {
    height: '100vh',
    width: '100vw',
    padding: '20px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#F0F8FF',
  },
  navigateWrapper: { flexShrink: 0, marginBottom: '15px' },
  mainContent: { flex: 1, display: 'flex', gap: '20px', minHeight: 0 },
  leftSection: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
  },
  rightMenu: { width: '300px', flexShrink: 0 },

  glassContainer: {
    backgroundColor: 'white',
    borderRadius: '24px',
    border: '1px solid #ccc',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
  },
  glassHeader: {
    textAlign: 'center',
    padding: '20px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    borderBottom: '1px solid #eee',
  },
  scrollArea: {
    flex: 1,
    padding: '24px',
    overflowY: 'auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '24px',
  },
};

export default function BookmarksPage() {
  const [bottles, setBottles] = useState([]); // API 데이터를 담을 상태

  useEffect(() => {
    const fetchBottles = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await GetBookmarkList(token);

        console.log('서버 응답:', res);

        setBottles(res.data || []);
      } catch (error) {
        console.error('데이터 로드 실패:', error);
      }
    };
    fetchBottles();
  }, []);

  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.navigateWrapper}>
        <NavigateCard />
      </div>

      <div style={styles.mainContent}>
        {/* 중앙: 받은 유리병 리스트 영역 */}
        <div style={styles.leftSection}>
          <div style={styles.glassContainer}>
            <div style={styles.glassHeader}>받은 유리병 보기</div>
            <div style={styles.scrollArea}>
              <div style={styles.grid}>
                {bottles.map((item, idx) => (
                  <BottleCard key={idx} data={item} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽: 메뉴 */}
        <div style={styles.rightMenu}>
          <MenuCard />
        </div>
      </div>
    </div>
  );
}
