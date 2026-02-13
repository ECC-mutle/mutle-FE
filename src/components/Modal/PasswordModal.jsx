// PasswordChangeModal.jsx
import { useState } from 'react';
import {
  Overlay,
  ModalBox,
  Title,
  Description,
  Input,
  ButtonRow,
  CancelButton,
  ConfirmButton,
} from './ConfirmModal.style';

export default function PasswordChangeModal({ onClose, onConfirm }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isValid =
    currentPassword &&
    newPassword &&
    confirmPassword &&
    newPassword === confirmPassword;

  const handleConfirm = () => {
    if (!isValid) return;

    onConfirm({
      currentPassword,
      newPassword,
    });
  };

  return (
    <Overlay>
      <ModalBox>
        <Title>비밀번호 변경</Title>
        <Description>현재 비밀번호와 새 비밀번호를 입력하세요</Description>

        <Input
          type='password'
          placeholder='현재 비밀번호'
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />

        <Input
          type='password'
          placeholder='새 비밀번호'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <Input
          type='password'
          placeholder='새 비밀번호 확인'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {newPassword !== confirmPassword && confirmPassword && (
          <p style={{ color: 'red', fontSize: '14px' }}>
            새 비밀번호가 일치하지 않습니다.
          </p>
        )}

        <ButtonRow>
          <CancelButton onClick={onClose}>취소</CancelButton>
          <ConfirmButton disabled={!isValid} onClick={handleConfirm}>
            변경하기
          </ConfirmButton>
        </ButtonRow>
      </ModalBox>
    </Overlay>
  );
}
