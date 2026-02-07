/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import React from 'react';
import './App.css';
import styled from '@emotion/styled';
import Header from './components/Header/Header';
import Login from './pages/Login/Login';

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f5f5f5;

  /* 중앙 정렬을 위한 핵심 코드 */
  display: flex;
  flex-direction: column; /* 헤더와 로그인박스를 위아래로 배치 */
  justify-content: center; /* 세로 중앙 */
  align-items: center; /* 가로 중앙 */

  /* 혹시 모를 외부 여백 제거 */
  position: fixed;
  top: 0;
  left: 0;
`;

function App() {
  return (
    <Background>
      <Header />
      <Login />
    </Background>
  );
}

export default App;
