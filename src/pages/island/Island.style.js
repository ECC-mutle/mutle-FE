// Island.styles.js
import BackgroundImage from '../../assets/images/BackgroundPic.png';

export const styles = {
  container: {
    height: '100vh',
    width: '100vw',
    padding: '20px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    backgroundImage: `url(${BackgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    overflow: 'hidden',
  },
  navigateWrapper: {
    flexShrink: 0,
    marginTop: '10px',
    marginBottom: '5px',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    gap: '20px',
    minHeight: 0,
  },
  leftSection: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    overflowY: 'auto', // 내용이 많으면 이 안에서 스크롤
  },
  topCards: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
    width: '100%', // 가로를 꽉 채우도록 유지
  },
  rightMenu: {
    width: '350px',
    flexShrink: 0,
  },
  backButton: {
    padding: '10px 24px',
    backgroundColor: '#666',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  followButton: {
    padding: '10px 24px',
    backgroundColor: '#4A90E2',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  calendarWrapper: {
    width: '100%', //가로 100% 사용
    boxSizing: 'border-box',
    // 만약 CalendarCard가 내부적으로 너무 크다면 아래 속성 추가
    overflowX: 'hidden',
  },
  // 프로필 이미지 크기
  profileImageCustom: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
};
