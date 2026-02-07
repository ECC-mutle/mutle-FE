import React from 'react';
import { InputGroup, InputLabel, InputField, ErrorText } from './styled';

const Input = ({
  label, // 입력창 위에 붙는 제목
  type = 'text', // text, password, email 등
  placeholder, // 미리보기 텍스트
  value, // 입력된 값
  onChange, // 값이 바뀔 때 실행할 함수
  error, // 에러 메시지 (있을 경우에만 표시)
  id,
  ...props // 기타 나머지 속성들 (name, id 등)
}) => {
  const inputId = id || `input-${label}`;
  return (
    <InputGroup>
      {label && <InputLabel htmlFor={inputId}>{label}</InputLabel>}

      <InputField
        id={inputId}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        isError={!!error}
        {...props}
      />

      {error && <ErrorText>{error}</ErrorText>}
    </InputGroup>
  );
};

export default Input;
