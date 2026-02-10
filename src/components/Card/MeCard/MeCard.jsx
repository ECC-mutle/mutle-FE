import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SettingItem from './SettingItem';
import { Card, Header, Title, SettingList } from './MeCard.style';
import ConfirmModal from '../../Modal/ConfirmModal';
import { Withdraw } from '../../../api/auth';

export default function MeCard() {
  const navigate = useNavigate();
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const token = localStorage.getItem('token');

  // 탈퇴 처리 함수 정의
  const handleWithdraw = async (password) => {
    try {
      await Withdraw(password, token); // 여기서 token 사용
      localStorage.removeItem('token'); // 로그아웃 처리
      setIsWithdrawOpen(false);
    } catch (error) {
      console.error(error);
      alert('회원 탈퇴 실패');
    }
  };

  return (
    <Card>
      <Header>환경설정</Header>
      <Title>계정 정보</Title>
      <SettingList>
        <SettingItem
          title='프로필 수정'
          description='닉네임, 프로필 사진을 변경합니다'
          onClick={() => console.log('프로필 수정')}
        />

        <SettingItem
          title='로그아웃'
          description='현재 로그인된 계정에서 로그아웃합니다'
          onClick={() => console.log('로그아웃')}
        />

        <SettingItem
          title='ID 변경'
          description='설정한 ID를 변경합니다'
          onClick={() => console.log('ID 변경')}
        />

        <SettingItem
          title='회원 탈퇴'
          description='계정 영구 삭제'
          isDanger
          onClick={() => setIsWithdrawOpen(true)}
        />

        {isWithdrawOpen && (
          <ConfirmModal
            title='정말 탈퇴하시겠어요?'
            description='탈퇴하면 계정 정보는 복구할 수 없습니다.'
            confirmText='탈퇴하기'
            cancelText='취소'
            isDanger
            requireInput
            inputPlaceholder='비밀번호 입력'
            onClose={() => setIsWithdrawOpen(false)}
            onConfirm={handleWithdraw}
          />
        )}
      </SettingList>
    </Card>
  );
}
