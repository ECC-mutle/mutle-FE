import { useState } from 'react';
import { UpdateBio } from '../../api/island';

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
  {
    /**아무것도 없을 때 표시될 값 지정 */
  }

  const [isEditing, setIsEditing] = useState(false);
  const [bioText, setBioText] = useState(profile?.bio || '아직 소개가 없어요');
  const nickname = profile?.nickname || '이름 없음';
  const profileImage = profile?.profileImage || ' ';

  const handleCancel = () => {
    setBioText(profile?.bio || '아직 소개가 없어요'); // profile의 원본 값으로 복원
    setIsEditing(false);
  };
  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        alert('로그인이 필요합니다.');
        return;
      }

      await UpdateBio(bioText, token);

      setIsEditing(false);

      setProfile((prev) => ({
        ...(prev || {}),
        bio: bioText,
      }));
    } catch (error) {
      console.log(error.response?.data);
      alert('수정 실패!');
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}></div>
      {/* 닉네임 영역 */}
      <div style={styles.nickname}>{nickname}</div>
      {/* 프로필사진 영역 */}
      <div style={styles.nickname}>{profileImage}</div>
      {/* Bio 영역 */}
      {isEditing ? (
        <>
          <textarea
            value={bioText}
            onChange={(e) => setBioText(e.target.value)}
            rows={3}
            style={{ width: '100%' }}
          />
          <button onClick={handleSave}>저장</button>
          <button onClick={handleCancel}>취소</button>
        </>
      ) : (
        <>
          <p style={styles.bio}>{bioText}</p>
          <button onClick={() => setIsEditing(true)}>수정</button>
        </>
      )}
    </div>
  );
}
