import { useState, useEffect, useCallback } from 'react';
import { styles } from '../island/Island.style';
import Header from '../../components/Header/Header';
import ProfileCard from '../../components/Card/ProfileCard';
import MusicCard from '../../components/Card/MusicCard';
import CalendarCard from '../../components/Card/CalendarCard';
import MenuCard from '../../components/Card/MenuCard';
import NavigateCard from '../../components/Card/NavigateCard';
import { GetProfile, UpdatePlatform, UpdateRepMusic } from '../../api/island';
import { RequestFriend } from '../../api/friends';
import { useLocation, useParams, useNavigate } from 'react-router-dom';

export default function Island() {
  const [profile, setProfile] = useState(null);
  const [repMusic, setRepMusic] = useState(null);
  const [platforms, setPlatforms] = useState([]);
  const [musicCalendar, setMusicCalendar] = useState([]);
  const location = useLocation();
  const { userId: urlUserId } = useParams();
  const [isFriend, setIsFriend] = useState(false);
  const navigate = useNavigate();

  const myUserId = localStorage.getItem('userId');
  const targetId = urlUserId || myUserId;
  const isMyIsland = !urlUserId || urlUserId === myUserId;

  const handleFollow = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('신청 대상 ID:', targetId);

      await RequestFriend(token, targetId);
      alert('친구 요청을 보냈습니다!');
      setIsFriend(true); // 임시로 상태 변경 (실제론 서버 응답 후 처리 권장)
    } catch (error) {
      console.error('친구 추가 실패:', error);
    }
  };

  const handleAddPlatform = async (newPlatformName, newPlatformNickname) => {
    try {
      const token = localStorage.getItem('token');
      const formattedName = newPlatformName.replace(/\s+/g, '_').toUpperCase();
      const newPlatform = [
        {
          platformName: formattedName,
          platformNickname: newPlatformNickname,
        },
      ];
      console.log(
        '🚀 [Step 1] 전송 데이터 확인:',
        JSON.stringify(newPlatform, null, 2),
      );

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

  useEffect(() => {
    const saveSelectedMusic = async () => {
      if (location.state?.selectedMusic) {
        const token = localStorage.getItem('token');
        try {
          // 1. 서버에 선택한 음악 저장 요청
          await UpdateRepMusic(location.state.selectedMusic, token);

          // 2. 서버 저장 성공 후 UI 업데이트
          setRepMusic(location.state.selectedMusic);

          // 3. (선택) 처리가 끝났으므로 location state 비우기 (중복 저장 방지)
          window.history.replaceState({}, document.title);
        } catch (error) {
          console.error('음악 업데이트 실패:', error);
          alert('음악 저장에 실패했습니다.');
        }
      }
    };

    saveSelectedMusic();
  }, [location.state]);

  const fetchProfileData = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('userId', localStorage.getItem('userId'));

      if (!token || !targetId) {
        console.warn('인증 정보나 대상 ID가 없습니다.');
        return;
      }

      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;

      const res = await GetProfile(targetId, token, year, month);
      console.log('프로필 서버 응답:', res);
      const data = res.data || res;
      // ProfileCard용
      setProfile({
        nickname: data.nickname,
        profileImage: data.profileImage,
        bio: data.bio,
      });

      // MusicCard용
      setRepMusic(data.repMusic);
      // Calendar용
      setMusicCalendar(data.calendars || []);
      // Platform 버튼용
      setPlatforms(data.platforms || []);
      setIsFriend(data.friend);
    } catch (error) {
      console.error('데이터 로딩 실패: ', error);
    }
  }, [targetId]);

  useEffect(() => {
    const syncSelectedMusic = async () => {
      // 1. 선택된 음악이 있을 때만 실행
      if (location.state?.selectedMusic) {
        const token = localStorage.getItem('token');
        try {
          // 2. 서버에 먼저 저장 (가장 중요)
          await UpdateRepMusic(location.state.selectedMusic, token);

          // 3. 저장 성공 후에 서버에서 최신 데이터를 다시 불러옴 (데이터 싱크 맞추기)
          await fetchProfileData();

          // 4. 처리가 끝났으므로 URL 상태에서 music 데이터 제거 (새로고침 시 중복 방지)
          window.history.replaceState({}, document.title);
        } catch (error) {
          console.error('음악 저장 실패:', error);
          alert('음악 수정 내용을 저장하지 못했습니다.');
        }
      } else {
        // 선택된 음악이 없는 평상시에는 데이터만 조회
        fetchProfileData();
      }
    };

    syncSelectedMusic();
  }, [location.state, fetchProfileData]);

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
          <CalendarCard
            calendarData={musicCalendar}
            isClickable={isMyIsland || isFriend}
          />

          {!isMyIsland && (
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button onClick={() => navigate(-1)} style={styles.backButton}>
                뒤로가기
              </button>
              {!isFriend && (
                <button onClick={handleFollow} style={styles.followButton}>
                  친구 추가
                </button>
              )}
            </div>
          )}
        </div>

        {/* 오른쪽: 메뉴 */}
        <div style={styles.rightMenu}>
          <MenuCard />
        </div>
      </div>
    </div>
  );
}
