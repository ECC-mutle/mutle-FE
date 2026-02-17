import styled from '@emotion/styled';

/*라벨+인풋+에러 메시지*/
export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
  width: 100%;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 500px;
  background-color: #b2ebf2; /* 이미지의 입력창 배경색 */
  border: 1px solid #757575;
  border-radius: 40px; /* 아주 둥글게 */
  padding: 5px 20px;
  margin-bottom: 15px;
  box-sizing: border-box;
`;

/*설명 텍스트*/
export const InputLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

/*props 받아서 스타일 동적으로 바꿈*/
export const InputField = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  padding: 12px 0;
  font-size: 16px;
  outline: none;
  color: #333;

  &::placeholder {
    color: #757575;
  }
`;

export const ErrorText = styled.p`
  font-size: 12px;
  color: #dc3545;
`;
