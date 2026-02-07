import styled from '@emotion/styled';

/*Header 전체 영역*/
export const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;

  padding: 16px 0;
`;

/*실제 보이는 헤더 박스*/
export const HeaderBox = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 0px 32px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 40px;
  border: 2px solid #fcfcfc;

  /* 오선지 느낌 배경 */
  background-color: #f5fbfd;
  background-image: repeating-linear-gradient(
    to bottom,
    transparent 4px,
    transparent 10px,
    #0000004d 11px,
    transparent 12px
  );
`;

/*로고 이미지*/
export const LogoImage = styled.img`
  height: 48px;
  object-fit: contain;
`;
