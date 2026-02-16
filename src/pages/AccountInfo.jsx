import { Card, Header } from '../components/Card/MeCard/MeCard.style';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetMyInfo, UpdateMyInfo } from '../api/auth';
import { UploadImage } from '../api/image';

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
      // 1. 수정 요청
      const response = await UpdateMyInfo(formData, token);

      // 서버가 정확히 어떤 키값으로 데이터를 주는지 확인
      // console.log('✅ 서버 응답 데이터:', response.data);

      // 2. 서버 응답에서 새 ID 추출
      const newUserId =
        response.data.userId || response.data.user_id || formData.userId;

      if (newUserId) {
        console.log('💾 로컬스토리지 아이디 갱신:', newUserId);
        localStorage.setItem('userId', newUserId);
      }

      // 3. 상태 업데이트
      setAccount(response.data);
      alert('정보가 성공적으로 수정되었습니다.');
      setIsEditing(false);

      // 4. Island로 이동할 때 새로고침을 강제하여 꼬인 상태를 초기화

      window.location.href = '/me';
    } catch (error) {
      console.error(
        '❌ 수정 실패 상세:',
        error.response?.data || error.message,
      );
      alert('정보 수정에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsLoading(true);
      // 1. 서버에 이미지 업로드
      const response = await UploadImage(file);
      // 2. 서버 응답에서 URL 추출 (구조에 따라 response.data 또는 response)
      const imageUrl = response.data || response;

      // 3. 폼 데이터의 이미지 URL 업데이트
      setFormData((prev) => ({
        ...prev,
        profileImage: imageUrl,
      }));
      alert('이미지가 성공적으로 업로드되었습니다.');
    } catch (error) {
      alert('이미지 업로드에 실패했습니다.');
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
        <div>
          {/* 렌더링 부분: 텍스트가 아닌 img 태그 사용 */}
          <img
            src={account.profileImage}
            alt='프로필'
            width='100'
            style={{ borderRadius: '50%' }}
          />
          <p>아이디: {account.userId}</p>
          <p>닉네임: {account.nickName}</p>
          <button onClick={() => setIsEditing(true)}>정보 수정</button>
        </div>
      ) : (
        // 편집 모드
        <form onSubmit={handleSubmit}>
          <div>
            <label>프로필 사진 변경:</label>
            {/* 텍스트 입력 대신 파일 선택 사용 */}
            <input
              type='file'
              accept='image/*'
              onChange={handleImageChange}
              disabled={isLoading}
            />
            {formData.profileImage && (
              <div style={{ marginTop: '10px' }}>
                <img
                  src={formData.profileImage}
                  alt='미리보기'
                  width='100'
                  style={{ borderRadius: '50%' }}
                />
                <p style={{ fontSize: '12px' }}>새 이미지 미리보기</p>
              </div>
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
