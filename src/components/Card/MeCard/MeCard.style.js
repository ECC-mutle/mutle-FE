import styled from '@emotion/styled';

export const Card = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const Header = styled.div`
  font-size: 16px;
  color: #6b7280;
  margin-bottom: 24px;
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
  gap: 16px;
`;
