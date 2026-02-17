import styled from '@emotion/styled';

export const Card = styled.div`
  background-color: #faf9f8;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const Header = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
  width: 100%;
  border-bottom: 2px solid #f4f4f4;
  padding-bottom: 15px;
  box-sizing: border-box;
`;

export const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 32px;
`;

export const SettingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const Rightmenu = styled.div`
    width: '350px',
    flexShrink: 0
`;

export const LeftSection = styled.div`
   flex: '1',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
`;
