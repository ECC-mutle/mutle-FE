// components/modal/ConfirmModal.style.js
import styled from '@emotion/styled';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

export const ModalBox = styled.div`
  width: 360px;
  background-color: white;
  border-radius: 12px;
  padding: 24px;
`;

export const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
  color: ${({ isDanger }) => (isDanger ? '#ef4444' : '#111827')};
`;

export const Description = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 20px;
  line-height: 1.4;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  margin-bottom: 20px;
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 8px;
`;

export const CancelButton = styled.button`
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: none;
  background-color: #e5e7eb;
  cursor: pointer;
`;

export const ConfirmButton = styled.button`
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background-color: ${({ isDanger }) => (isDanger ? '#ef4444' : '#2563eb')};
  color: white;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
