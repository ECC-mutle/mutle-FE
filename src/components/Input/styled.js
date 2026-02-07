import styled from '@emotion/styled';

/*라벨+인풋+에러 메시지*/
export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
  width: 100%;
`;

/*설명 텍스트*/
export const InputLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

/*props 받아서 스타일 동적으로 바꿈*/
export const InputField = styled.input(({ isError }) => ({
  padding: '12px',
  borderRadius: '6px',
  fontSize: '16px',
  border: `1px solid ${isError ? '#dc3545' : '#ddd'}`,
  transition: 'border-color 0.2s',
  outline: 'none',

  '&:focus': {
    borderColor: isError ? '#dc3545' : '#007bff',
  },

  '&:hover': {
    borderColor: isError ? '#dc3545' : '#bbb',
  },
}));

export const ErrorText = styled.p`
  font-size: 12px;
  color: #dc3545;
`;
