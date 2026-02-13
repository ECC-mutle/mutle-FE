import React from 'react';
import './App.css';
import styled from '@emotion/styled';
import BackgroundImage from './assets/images/BackgroundPic.png';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Island from './pages/Island';
import Friends from './pages/Friends';
import Me from './pages/Me/Me';
import OnboardingPage from './pages/Onboarding';
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import RandomPage from './pages/Bottles/Random';
import BottlesPage from './pages/Bottles/Bottles';
import BookmarksPage from './pages/Bottles/Bookmarks';
import KakaoCallback from './pages/KakaoCallback';
import GoogleCallback from './pages/GoogleCallBack';

import SearchMusicPage from './pages/SearchMusic';
import SearchMusicPage_island from './pages/SearchMusic_island';

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
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<OnboardingPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/kakao-callback' element={<KakaoCallback />} />
        <Route path='/google-callback' element={<GoogleCallback />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/bottles/bottles' element={<BottlesPage />} />
        <Route path='/search-music' element={<SearchMusicPage />} />
        <Route path='/me' element={<Me />} />
        <Route path='/random' element={<RandomPage />} />
        <Route path='/island' element={<Island />} />
        <Route path='/friends' element={<Friends />} />
        <Route path='/bookmarks' element={<BookmarksPage />} />
        <Route
          path='/search-music-island'
          element={<SearchMusicPage_island />}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
