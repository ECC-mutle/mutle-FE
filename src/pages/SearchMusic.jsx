import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { SearchMusic } from '../api/music';
import Header from '../components/Header/Header';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
`;

const LoginCard = styled.div`
  width: 90%;
  max-width: 900px;
  height: 550px;
  background-color: rgba(178, 235, 242, 0.7);
  border-radius: 30px;
  border: 1px solid #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* 중앙 정렬 */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  margin-top: 20px;
`;

const SearchBar = styled.div`
  display: flex;
  gap: 10px;
  width: 90%;
  max-width: 600px;
  margin-bottom: 25px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 12px 20px;
  border-radius: 25px;
  border: 1px solid #333;
  outline: none;
  font-size: 1rem;
`;

const SearchButton = styled.button`
  padding: 0 25px;
  border-radius: 25px;
  border: 1px solid #333;
  background-color: #fff;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;
  &:hover {
    background-color: #eee;
  }
`;

const ResultList = styled.div`
  background: white;
  border-radius: 20px;
  border: 1px solid #333;
  width: 90%;
  max-width: 650px;
  height: 350px; /* 고정 높이 */
  overflow-y: auto;
  padding: 10px;

  /* 스크롤바 디자인 (선택) */
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 10px;
  }
`;

const ResultItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 15px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background 0.2s;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: #f0faff;
  }
`;

const AlbumArt = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  margin-right: 15px;
  object-fit: cover;
  border: 1px solid #eee;
`;

const Card = styled.div`
  background: #e0f2f7;
  padding: 30px;
  border-radius: 20px;
  width: 90%;
  max-width: 500px;
`;

const MusicInfo = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

export default function SearchMusicPage() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!keyword.trim()) return;
    try {
      const res = await SearchMusic(keyword);
      // API 응답 구조: { data: [{ trackName, artistName, artworkUrl160 }, ...] }
      setResults(res.data || []);
    } catch (error) {
      alert('검색 중 오류가 발생했습니다.');
    }
  };

  const handleSelect = (music) => {
    // 선택한 음악 정보를 가지고 이전 페이지로 이동
    // state를 통해 데이터를 넘겨줌.
    navigate('/bottles/bottles', { state: { selectedMusic: music } });
  };

  return (
    <PageWrapper>
      <Header />
      <LoginCard>
        <SearchBar>
          <SearchInput
            placeholder='검색할 키워드를 입력하세요.'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <SearchButton onClick={handleSearch}>검색하기</SearchButton>
        </SearchBar>

        <ResultList>
          {results.length > 0 ? (
            results.map((item, idx) => (
              <ResultItem key={idx} onClick={() => handleSelect(item)}>
                <AlbumArt src={item.artworkUrl60} alt='album' />
                <MusicInfo>
                  <strong style={{ fontSize: '0.9rem' }}>
                    {item.trackName}
                  </strong>
                  <span style={{ fontSize: '0.8rem', color: '#666' }}>
                    {item.artistName}
                  </span>
                </MusicInfo>
              </ResultItem>
            ))
          ) : (
            <p
              style={{ color: '#999', fontSize: '0.9rem', textAlign: 'center' }}
            >
              검색 결과가 없습니다.
            </p>
          )}
        </ResultList>
      </LoginCard>
    </PageWrapper>
  );
}
