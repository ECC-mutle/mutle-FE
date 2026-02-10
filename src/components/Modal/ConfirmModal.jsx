// components/modal/ConfirmModal.jsx
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
          <CancelButton onClick={onClose}>{cancelText}</CancelButton>

          <ConfirmButton
            isDanger={isDanger}
            disabled={requireInput && !inputValue}
            onClick={handleConfirm}
          >
            {confirmText}
          </ConfirmButton>
        </ButtonRow>
      </ModalBox>
    </Overlay>
  );
}
