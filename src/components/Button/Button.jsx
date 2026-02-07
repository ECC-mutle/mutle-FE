import React from 'react';
import { BaseButton } from './styled';

// 1. Props(속성) 설정: 버튼이 가질 수 있는 옵션들 정의
const Button = ({
  children, // 버튼 사이에 들어갈 내용 (ex: <Button>확인</Button> 의 '확인')
  onClick, // 클릭했을 때 실행할 함수
  variant = 'primary', // 버튼의 종류 (기본값은 primary)
  size = 'md', // 버튼의 크기 (기본값은 중간 크기인 md)
  disabled = false, // 버튼을 못 누르게 할지 여부. false는 눌림 상태.
  type = 'button', // 폼 전송용인지 일반 버튼인지 설정
}) => {
  // 2. 클래스 네임 조합: 옵션에 따라 다른 CSS 클래스 적용
  // ex : variant가 'danger'라면 클래스명은 "btn btn-danger"가 됨.

  return (
    <BaseButton
      type={type}
      onClick={onClick} // 전달받은 함수 연결
      variant={variant}
      size={size}
      disabled={disabled} // 비활성화 여부를 적용
    >
      {children}
    </BaseButton>
  );
};

export default Button; // 다른 파일에서 Button 쓸 수 있도록 내보내기
