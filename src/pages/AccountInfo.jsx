import { Card } from '../components/Card/MeCard/MeCard.style';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetMyInfo, UpdateMyInfo } from '../api/auth';
import { UploadImage } from '../api/image';
import MenuCard from '../components/Card/MenuCard';
import Header from '../components/Header/Header';

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

  const fullScreenStyle = {
    width: '100vw', // 화면 너비 100%
    height: '100vh', // 화면 높이 100%
    margin: 0, // 기본 여백 제거
    padding: '40px', // 내부 여백 (답답하지 않게)
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // 가로 중앙 정렬
    borderRadius: 0,
  };
  const inputGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  };
  const labelStyle = { fontSize: '14px', fontWeight: 'bold', color: '#666' };
  const inputStyle = {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '16px',
  };
  const saveButtonStyle = {
    flex: 1,
    padding: '15px',
    background: '#4FABE9',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    fontWeight: 'bold',
  };
  const cancelButtonStyle = {
    flex: 0.5,
    padding: '15px',
    background: '#eee',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
  };
  const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '30px',
    textAlign: 'center',
    width: '100%',
    borderBottom: '2px solid #f4f4f4',
    paddingBottom: '15px',
  };

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
    <div
      style={{
        height: '100vh',
        width: '100vw',
        padding: '20px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* 상단 헤더 유지 */}
      <Header />

      {/*메인 레이아웃 */}
      <div
        style={{
          display: 'flex',
          gap: '24px',
          marginTop: '30px',
          flex: 1,
          minHeight: 0,
        }}
      >
        {/* 왼쪽: 수정 폼 */}
        <div style={{ flex: 1, minHeight: 0 }}>
          <Card
            style={{
              height: '1500px',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#FAF9F8',
            }}
          >
            <div style={titleStyle}>계정 정보 수정</div>

            <form
              onSubmit={handleSubmit}
              style={{ padding: '30px', overflowY: 'auto' }}
            >
              <div style={{ marginBottom: '25px', textAlign: 'center' }}>
                <img
                  src={formData.profileImage}
                  alt='프로필'
                  style={{
                    width: '200px',
                    height: '200px',
                    borderRadius: '12px',
                    objectFit: 'cover',
                    border: '1px solid #ddd',
                  }}
                />
                <input
                  type='file'
                  onChange={handleImageChange}
                  style={{ display: 'block', margin: '15px auto' }}
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                }}
              >
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>아이디</label>
                  <input
                    style={inputStyle}
                    name='userId'
                    value={formData.userId}
                    onChange={handleInputChange}
                  />
                </div>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>닉네임</label>
                  <input
                    style={inputStyle}
                    name='nickname'
                    value={formData.nickname}
                    onChange={handleInputChange}
                  />
                </div>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>이메일</label>
                  <input
                    style={inputStyle}
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div style={{ marginTop: '40px', display: 'flex', gap: '12px' }}>
                <button
                  type='submit'
                  disabled={isLoading}
                  style={saveButtonStyle}
                >
                  {isLoading ? '저장 중...' : '변경사항 저장'}
                </button>
                <button
                  type='button'
                  onClick={() => navigate('/me')}
                  style={cancelButtonStyle}
                >
                  취소
                </button>
              </div>
            </form>
          </Card>
        </div>

        {/* 오른쪽: MenuCard */}
        <div style={{ width: '350px', flexShrink: 0 }}>
          <MenuCard />
        </div>
      </div>
    </div>
  );
}
