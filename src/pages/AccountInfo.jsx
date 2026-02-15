import { Card, Header } from '../components/Card/MeCard/MeCard.style';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetMyInfo, UpdateMyInfo } from '../api/auth';

export default function AccountPage() {
  const [account, setAccount] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: '',
    nickname: '',
    email: '',
    profileImage: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const res = await GetMyInfo(token);
      setAccount(res.data);

      // 초기 폼 데이터 설정
      setFormData({
        userId: res.data.userId || '',
        nickname: res.data.nickName || '',
        email: res.data.email || '',
        profileImage: res.data.profileImage || '',
      });
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');

      const response = await UpdateMyInfo(formData, token);

      // 성공하면 account 상태 업데이트
      setAccount(response.data);
      setFormData({
        userId: response.data.userId || '',
        nickname: response.data.nickName || '',
        email: response.data.email || '',
        profileImage: response.data.profileImage || '',
      });

      alert('정보가 성공적으로 수정되었습니다.');
      setIsEditing(false);
    } catch (error) {
      alert('정보 수정에 실패했습니다.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // 원래 데이터로 복원
    setFormData({
      userId: account.userId || '',
      nickname: account.nickName || '',
      email: account.email || '',
      profileImage: account.profileImage || '',
    });
    setIsEditing(false);
  };

  // 로딩 중
  if (!account) {
    return <div>로딩중...</div>;
  }

  return (
    <Card>
      <Header>계정 정보</Header>

      {!isEditing ? (
        // 보기 모드
        <div>
          <img src={account.profileImage} alt='프로필' width='100' />
          <p>아이디: {account.userId}</p>
          <p>닉네임: {account.nickName}</p>
          <p>이메일: {account.email}</p>
          <button onClick={() => setIsEditing(true)}>정보 수정</button>
          <button onClick={() => navigate('/me')}>뒤로가기</button>
        </div>
      ) : (
        // 편집 모드
        <form onSubmit={handleSubmit}>
          <div>
            <label>프로필 이미지 URL:</label>
            <input
              type='text'
              name='profileImage'
              value={formData.profileImage}
              onChange={handleInputChange}
            />
            {formData.profileImage && (
              <img src={formData.profileImage} alt='미리보기' width='100' />
            )}
          </div>

          <div>
            <label>아이디:</label>
            <input
              type='text'
              name='userId'
              value={formData.userId}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>닉네임:</label>
            <input
              type='text'
              name='nickname'
              value={formData.nickname}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>이메일:</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <button type='submit' disabled={isLoading}>
            {isLoading ? '저장 중...' : '저장'}
          </button>
          <button type='button' onClick={handleCancel} disabled={isLoading}>
            취소
          </button>
        </form>
      )}
    </Card>
  );
}
