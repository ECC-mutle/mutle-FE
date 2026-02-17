// components/modal/ConfirmModal.jsx

import { useState } from 'react';
import { BaseButton } from '../Button/styled';
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

export default function ConfirmModal({
  title,
  description,
  confirmText = '확인',
  cancelText = '취소',
  isDanger = false,
  requireInput = false,
  inputPlaceholder = '',
  onConfirm,
  onClose,
}) {
  const [inputValue, setInputValue] = useState('');

  const handleConfirm = () => {
    if (requireInput) {
      onConfirm(inputValue);
    } else {
      onConfirm();
    }
  };

  return (
    <Overlay>
      <ModalBox>
        <Title isDanger={isDanger}>{title}</Title>
        <Description>{description}</Description>

        {requireInput && (
          <Input
            type='password'
            placeholder={inputPlaceholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        )}

        <ButtonRow>
          {/* 취소 버튼: secondary + lg */}
          <BaseButton variant='secondary' size='lg' onClick={onClose}>
            {cancelText}
          </BaseButton>

          {/* 확인 버튼: danger OR primary*/}
          <BaseButton
            variant={isDanger ? 'danger' : 'primary'}
            size='lg'
            disabled={requireInput && !inputValue}
            onClick={handleConfirm}
          >
            {confirmText}
          </BaseButton>
        </ButtonRow>
      </ModalBox>
    </Overlay>
  );
}
