import styled from '@emotion/styled';

/* 공통 카드 */
export const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

/* 헤더 */
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

/* 검색 */
export const SearchRow = styled.div`
  display: flex;
  gap: 12px;
  margin: 20px 0;
`;

export const Input = styled.input`
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
`;

export const SearchButton = styled.button`
  background: #3b82f6;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
`;

export const BackButton = styled.button`
  background: #e5e7eb;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
`;

/* 결과 */
export const ResultBox = styled.div`
  padding: 16px;
  background: #f0f9ff;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
`;

/* 리스트 */
export const List = styled.div`
  flex: 1;
  overflow-y: auto;
`;

/* 친구 아이템 */
export const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: 12px;
  border: ${(p) =>
    p.isSearchResult ? '2px solid #e5e7eb' : '1px solid #e5e7eb'};
  margin-bottom: 12px;
`;

export const Profile = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(to bottom right, #fb923c, #9333ea);
`;

export const Info = styled.div`
  flex: 1;
`;

export const Name = styled.h3`
  font-size: 16px;
  margin: 0;
`;

export const Status = styled.p`
  font-size: 13px;
  color: #6b7280;
  margin: 4px 0 0;
`;

export const Song = styled.div`
  background: #f9fafb;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const Button = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 13px;
  color: white;
  background: ${(p) => (p.danger ? '#ef4444' : '#1f2937')};
`;
