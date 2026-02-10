/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import React from 'react';
import './App.css';
import styled from '@emotion/styled';
import Header from './components/Header/Header';

import BackgroundImage from './assets/images/BackgroundPic.png';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Island from './pages/Island';
import Friends from './pages/Friends';
import Me from './pages/Me';
import SearchMusicPage from './pages/SearchMusic';
import LoginPage from './pages/Login';

const Background = styled.div`
  width: 100vw;
  height: 100vh;

  /* 중앙 정렬을 위한 핵심 코드 */
  display: flex;
  flex-direction: column; /* 헤더와 로그인박스를 위아래로 배치 */
  justify-content: center; /* 세로 중앙 */
  align-items: center; /* 가로 중앙 */

  /* 배경 이미지 설정 */
  background-image: url(${BackgroundImage});
  background-size: cover; /* 화면을 꽉 채움 */
  background-position: center; /* 이미지를 중앙에 배치 */
  background-repeat: no-repeat; /* 이미지 반복 방지 */

  /* 혹시 모를 외부 여백 제거 */
  position: fixed;
  top: 0;
  left: 0;
`;

{
  /*url이 다 달라서 각 url 쳐야 화면 보임, 보이는 순서는 추후에 조정*/
}
function App() {
  return (
    <Background>
      <BrowserRouter>
        <Routes>
          <Route path='/island' element={<Island />} />
          <Route path='/friends' element={<Friends />} />
          <Route path='/me' element={<Me />} />
          <Route path='/search-music' element={<SearchMusicPage />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </Background>
  );
}
export default App;
