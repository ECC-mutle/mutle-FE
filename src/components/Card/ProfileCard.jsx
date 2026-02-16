import { useState, useEffect } from 'react';
import { UpdateBio } from '../../api/island';
import defaultProfile from '../../assets/images/defaultProfile.png';

const styles = {
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '10px',
    boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
  },
  header: {
    width: '128px',
    height: '80px',
    background: 'linear-gradient(to bottom right, #fb923c, #9333ea)',
    borderRadius: '8px',
    margin: '0 auto 16px',
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

export default function ProfileCard({ profile, setProfile }) {
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
          src={profileImage}
          alt='프로필'
          style={styles.profileImg}
          onError={(e) => {
            e.target.src = defaultProfile;
          }}
        />
      </div>
      {/* 닉네임 영역 */}
      <div style={styles.nickname}>{nickname}</div>
      {/* Bio 영역 */}
      {isEditing ? (
        <>
          <textarea
            value={inputBio}
            onChange={(e) => setInputBio(e.target.value)}
            rows={3}
            style={{ width: '100%' }}
          />
          <button onClick={handleSave}>저장</button>
          <button onClick={() => setIsEditing(false)}>취소</button>
        </>
      ) : (
        <>
          <p style={styles.bio}>{bio}</p>
          <button onClick={() => setIsEditing(true)}>수정</button>
        </>
      )}
    </div>
  );
}
