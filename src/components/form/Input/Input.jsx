import React from 'react';
import './Input.css';

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
    <div className='input-group'>
      {label && (
        <label className='input-label' htmlFor={inputId}>
          {label}
        </label>
      )}

      <input
        id={inputId}
        type={type}
        className={`input-field ${error ? 'input-error' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />

      {error && <span className='error-text'>{error}</span>}
    </div>
  );
};

export default Input;
