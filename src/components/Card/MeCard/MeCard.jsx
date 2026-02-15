import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SettingItem from './SettingItem';
import { Card, Header, SettingList } from './MeCard.style';
import ConfirmModal from '../../Modal/ConfirmModal';
import PasswordChangeModal from '../../Modal/PasswordModal';
import { Withdraw, Logout, UpdatePassword } from '../../../api/auth';
import MenuCard from '../../Card/MenuCard';

const styles = {
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
  },
  rightMenu: {
    width: '350px',
    flexShrink: 0,
  },
};

export default function MeCard() {
  const navigate = useNavigate();
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isUpdatePasswordOpen, setIsUpdatePasswordOpen] = useState(false);

  const token = localStorage.getItem('token');

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');

      if (token) {
        await Logout(token);
      }

      localStorage.removeItem('token');
      setIsLogoutOpen(false);
      navigate('/');

      console.log('로그아웃 성공');
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };

  const handleUpdatePassword = async ({ currentPassword, newPassword }) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await UpdatePassword(currentPassword, newPassword, token);
      }
      alert('비밀번호 변경 성공');

      setIsUpdatePasswordOpen(false);
    } catch (error) {
      console.error('비밀번호 변경 오류 발생:', error);
      alert('비밀번호 변경 실패');
    }
  };

  const handleWithdraw = async (password) => {
    try {
      const token = localStorage.getItem('token');

      if (token) {
        await Withdraw(password, token);
      }

      localStorage.removeItem('token');
      setIsWithdrawOpen(false);

      console.log('탈퇴 성공');
    } catch (error) {
      console.error('탈퇴 중 오류 발생:', error);
    }
  };

  return (
    <Card>
      <Header>환경설정</Header>

      <SettingList>
        <SettingItem
          title='계정 정보 확인 및 수정'
          description='계정 정보를 확인하고 수정합니다'
          onClick={() => navigate('/accountinfo')}
        />

        <SettingItem
          title='비밀번호 변경'
          description='설정한 비밀번호를 변경합니다'
          onClick={() => {
            setIsUpdatePasswordOpen(true);
          }}
        />

        <SettingItem
          title='로그아웃'
          description='현재 로그인된 계정에서 로그아웃합니다'
          onClick={() => {
            setIsLogoutOpen(true);
          }}
        />

        <SettingItem
          title='회원 탈퇴'
          description='계정 영구 삭제'
          isDanger
          onClick={() => setIsWithdrawOpen(true)}
        />

        {isUpdatePasswordOpen && (
          <PasswordChangeModal
            onClose={() => setIsUpdatePasswordOpen(false)}
            onConfirm={handleUpdatePassword}
          />
        )}

        {isLogoutOpen && (
          <ConfirmModal
            title='정말 로그아웃하시겠어요?'
            description='로그아웃하면 다시 로그인해야 합니다.'
            confirmText='로그아웃'
            cancelText='취소'
            isDanger
            onClose={() => setIsLogoutOpen(false)}
            onConfirm={handleLogout}
          />
        )}

        {isWithdrawOpen && (
          <ConfirmModal
            title='정말 탈퇴하시겠어요?'
            description='탈퇴하면 계정 정보는 복구할 수 없습니다.'
            confirmText='탈퇴하기'
            cancelText='취소'
            isDanger
            requireInput
            inputPlaceholder='비밀번호 입력'
            onConfirm={handleWithdraw}
            onClose={() => setIsWithdrawOpen(false)}
          />
        )}
      </SettingList>
    </Card>
  );
}
