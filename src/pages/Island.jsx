import { useState, useEffect, useCallback } from 'react';
import Header from '../components/Header/Header';
import ProfileCard from '../components/Card/ProfileCard';
import MusicCard from '../components/Card/MusicCard';
import CalendarCard from '../components/Card/CalendarCard';
import MenuCard from '../components/Card/MenuCard';
import NavigateCard from '../components/Card/NavigateCard';
import { GetProfile, UpdatePlatform, UpdateRepMusic } from '../api/island';
import { useLocation, useParams } from 'react-router-dom';

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

export default function Island() {
  const [profile, setProfile] = useState(null);
  const [repMusic, setRepMusic] = useState(null);
  const [platforms, setPlatforms] = useState([]);
  const [musicCalendar, setMusicCalendar] = useState([]);
  const location = useLocation();
  const { userId: friendUserId } = useParams();
  const myUserId = localStorage.getItem('userId'); // poiu

  const targetUserId = friendUserId || myUserId;
  const isMyIsland = !friendUserId || friendUserId === myUserId;

  const handleAddPlatform = async (newPlatformName, newPlatformNickname) => {
    try {
      const token = localStorage.getItem('token');

      const newPlatform = [
        {
          platformName: newPlatformName.toUpperCase(),
          platformNickname: newPlatformNickname,
        },
      ];

      // 기존 덮어쓰기 (의도된 동작)
      await UpdatePlatform(newPlatform, token);

      // 다시 전체 조회
      await fetchProfileData();

      // 프론트 state 즉시 업데이트
      // setPlatforms(newPlatform);

      // 입력창 닫기 + 초기화
      // setShowPlatformInput(false);
      // setNewPlatformName('');
      // setNewPlatformNickname('');
    } catch (error) {
      console.error('플랫폼 추가 실패:', error);
    }
  };

  useEffect(() => {
    if (location.state?.selectedMusic) {
      setRepMusic(location.state.selectedMusic);
    }
  }, [location.state]);

  const fetchProfileData = useCallback(async () => {
    console.log('fetchProfileData');

    try {
      const token = localStorage.getItem('token');
      //const userId = localStorage.getItem('userId');
      //console.log('token', localStorage.getItem('token'));
      //console.log('userId', localStorage.getItem('userId'));

      if (!token || !targetUserId) return;

      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;

      const res = await GetProfile(targetUserId, token, year, month);
      console.log('프로필 서버 응답:', res);

      const data = res.data;

      // ProfileCard용
      setProfile({
        nickname: data.nickname,
        profileImage: data.profileImage,
        bio: data.bio,
      });

      // MusicCard용
      setRepMusic(data.repMusic || null);
      // Calendar용
      setMusicCalendar(data.calendars || []);

      // Platform 버튼용
      setPlatforms(data.platforms || []);
    } catch (error) {
      console.error('데이터 로딩 실패:', error);
    }
  }, [targetUserId]);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  useEffect(() => {
    const updateSelectedMusic = async () => {
      const selectedMusic = location.state?.selectedMusic;
      if (selectedMusic && isMyIsland) {
        try {
          const token = localStorage.getItem('token');
          await UpdateRepMusic(
            {
              trackName: selectedMusic.trackName,
              artistName: selectedMusic.artistName,
              artworkUrl60: selectedMusic.artworkUrl60,
            },
            token,
          );

          await fetchProfileData();
          window.history.replaceState({}, document.title);
        } catch (error) {
          console.error('음악 업데이트 실패:', error);
        }
      }
    };

    updateSelectedMusic();
  }, [location.state, isMyIsland, fetchProfileData]);
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
            <ProfileCard
              profile={profile}
              setProfile={setProfile}
              isEditable={isMyIsland}
            />

            <MusicCard
              repMusic={repMusic}
              platforms={platforms}
              // 자식에게 부모의 로직(함수)을 통째로 넘깁니다.
              handleAddPlatform={handleAddPlatform}
              onAddPlatform={isMyIsland ? handleAddPlatform : null}
            />
          </div>

          {/* 하단: 캘린더 */}
          <CalendarCard calendarData={musicCalendar} />
        </div>

        {/* 오른쪽: 메뉴 */}
        <div style={styles.rightMenu}>
          <MenuCard />
        </div>
      </div>
    </div>
  );
}
