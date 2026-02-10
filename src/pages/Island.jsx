import { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import ProfileCard from '../components/Card/ProfileCard';
import MusicCard from '../components/Card/MusicCard';
import CalendarCard from '../components/Card/CalendarCard';
import MenuCard from '../components/Card/MenuCard';
import NavigateCard from '../components/Card/NavigateCard';
import { GetProfile } from '../api/island';
import { useLocation } from 'react-router-dom';

// 스타일 객체 분리
const styles = {
  container: {
    height: '100vh',
    width: '100vw',
    padding: '20px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
  },
  navigateWrapper: {
    flexShrink: 0,
    marginTop: '15px',
    marginBottom: '15px',
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
  },
  topCards: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
  },
  rightMenu: {
    width: '350px',
    flexShrink: 0,
  },
};

//달력은 날짜 정보를 어떻게 사용하는지 헷갈려서 아직 구현 안함 ㅜ
export default function Island() {
  const [profile, setProfile] = useState(null);
  const [repMusic, setRepMusic] = useState(null);
  const [platforms, setPlatforms] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.selectedMusic) {
      setRepMusic(location.state.selectedMusic);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchProfileData = async () => {
      // 토큰과 userId 가져오기
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;

      /*api 응답 구조: 
    "data": {
      "me": true,
      "friend": true,
      "year": "2026",
      "month": "01",
      "nickname": "홍길동",
      "profileImage": "https://music-community.com/img/profile/example2.jpg",
      "bio": "안녕하세요, 음악을 사랑하는 홍길동입니다.",
      "repMusic": {
        "trackName": "곡 제목",
        "artistName": "가수 이름",
        "artworkUrl160": "앨범 커버 이미지 주소"
    },
    "platforms": [
      {
      "platformName": "Apple Music",
      "platformNickname": "example2"
      },
      {
      "platformName": "Melon",
      "platformNickname": "example2"
      }
    ],*/

      const res = await GetProfile(userId, token, year, month);
      const data = res.data;

      // API 응답 구조에 맞게 각 카드별로 나눠서 state 업데이트
      // ProfileCard
      setProfile({
        nickname: data.nickname,
        profileImage: data.profileImage,
        bio: data.bio,
      });
      // MusicCard
      setRepMusic(data.repMusic || null);
      setPlatforms(data.platforms || []);
    };

    fetchProfileData();
  }, []);

  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.navigateWrapper}>
        <NavigateCard />
      </div>

      {/* 메인 컨텐츠 영역 */}
      <div style={styles.mainContent}>
        {/* 왼쪽+중앙 영역 */}
        <div style={styles.leftSection}>
          {/* 상단: 프로필 + 음악 카드 */}
          <div style={styles.topCards}>
            <ProfileCard profile={profile} />
            <MusicCard repMusic={repMusic} platforms={platforms} />
          </div>

          {/* 하단: 캘린더 */}
          <CalendarCard />
        </div>

        {/* 오른쪽: 메뉴 */}
        <div style={styles.rightMenu}>
          <MenuCard />
        </div>
      </div>
    </div>
  );
}
