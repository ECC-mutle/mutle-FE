import { useState, useEffect } from 'react';
import { UpdateBio } from '../../api/island';
import defaultProfile from '../../assets/images/defaultProfile.png';
import Button from '../../components/Button/Button';

const styles = {
  card: {
    backgroundColor: '#FAF9F8',
    borderRadius: '20px',
    padding: '10px',
    boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
    display: 'flex', // 가로 정렬의 핵심
    padding: '20px',
    flexDirection: 'row',
    alignItems: 'center', // 세로 중앙 정렬
    justifyContent: 'center',
    gap: '20px',
  },
  profileImg: {
    width: '150px', // 크기 키움
    height: '150px', // 크기 키움
    borderRadius: '12px', // 네모 느낌 (완전 네모는 0)
    objectFit: 'cover',
    border: '1px solid #eee',
  },
  imageContainer: {
    flexShrink: 0, // 이미지가 찌그러지지 않게 고정
    padding: '20px',
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  nickname: {
    fontSize: '20px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bio: {
    textAlign: 'center',
    color: '#4b5563',
  },
};

export default function ProfileCard({ profile, setProfile, isEditable }) {
  const bioDefaultText = '아직 소개가 없어요';
  const bio = profile?.bio ?? bioDefaultText;
  const nickname = profile?.nickname || '이름 없음';
  const profileImage = profile?.profileImage || ' ';
  const [isEditing, setIsEditing] = useState(false);
  const [inputBio, setInputBio] = useState(''); // 기본값으로 빈 문자열 전달

  // 비동기로 받아오는 데이터를 input 초기값으로 쓸 때는 useState('') + useEffect 조합으로 진행
  // const [inputBio, setInputBio] = useState(bio);는 bio가 렌더링 전에 이미 확정된 경우에만 안전하게 사용 가능
  useEffect(() => {
    setInputBio(profile?.bio ?? '');
  }, [profile?.bio]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        alert('로그인이 필요합니다.');
        return;
      }

      await UpdateBio(inputBio, token);

      setIsEditing(false);

      setProfile((prev) => ({
        ...(prev || {}),
        bio: inputBio,
      }));
    } catch (error) {
      console.log(error.response?.data);
      alert('수정 실패!');
    }
  };

  return (
    <div style={styles.card}>
      {/* 프로필사진 영역*/}
      <div style={styles.imageContainer}>
        <img
          src={profile?.profileImage || defaultProfile}
          style={styles.profileImg}
          alt='profile'
        />
      </div>
      {/* 닉네임 영역 */}
      <div style={styles.infoContainer}>
        <div style={styles.nickname}>{nickname}</div>
        {/* Bio 영역 */}
        {isEditing && isEditable ? (
          <>
            <textarea
              value={inputBio}
              onChange={(e) => setInputBio(e.target.value)}
              rows={3}
              style={{ width: '100%' }}
            />
            <Button variant='yes' size='sm' onClick={handleSave}>
              저장
            </Button>
            <Button variant='no' size='sm' onClick={() => setIsEditing(false)}>
              취소
            </Button>
          </>
        ) : (
          <>
            <p style={styles.bio}>{bio}</p>
            {isEditable && (
              <Button
                variant='primary'
                size='md'
                onClick={() => setIsEditing(true)}
              >
                수정
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
