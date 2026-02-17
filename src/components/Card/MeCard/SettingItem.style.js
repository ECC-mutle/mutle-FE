import styled from '@emotion/styled';

export const ItemButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f3f4f6;
  }
`;

export const TextBox = styled.div`
  text-align: left;
`;

export const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
  color: ${({ isDanger }) => (isDanger ? '#ef4444' : '#1f2937')};
`;

export const Description = styled.div`
  font-size: 13px;
  color: #6b7280;
`;

export const Arrow = styled.span`
  font-size: 18px;
  color: #9ca3af;
`;
