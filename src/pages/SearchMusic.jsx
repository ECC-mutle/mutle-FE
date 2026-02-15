import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { SearchMusic } from '../api/music';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  height: 100vh;
  background-color: #f0f8ff;
`;

const Card = styled.div`
  background: #e0f2f7;
  padding: 30px;
  border-radius: 20px;
  width: 90%;
  max-width: 500px;
`;

const SearchBar = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 10px 15px;
  border-radius: 20px;
  border: none;
  outline: none;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  background-color: #ccc;
  cursor: pointer;
  font-weight: bold;
`;

const ResultList = styled.div`
  background: white;
  border-radius: 15px;
  padding: 15px;
  max-height: 400px;
  overflow-y: auto;
`;

const ResultItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  &:hover {
    background-color: #f9f9f9;
  }
`;

const AlbumArt = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  margin-right: 15px;
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
    <Container>
      <Card>
        <SearchBar>
          <SearchInput
            placeholder='입력하기'
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
      </Card>
    </Container>
  );
}
