/** @jsxImportSource @emotion/react */

import { useState } from 'react';
import './App.css';
import styled from '@emotion/styled';
//import Button from './components/Button/Button';
//import Input from './components/Input';

import Header from './components/Header/Header';
import React from 'react';
import Login from './pages/Login/Login';

const Background = styled.div`
  width: 100vw; /* 뷰포트 전체 너비 */
  height: 100vh; /* 뷰포트 전체 높이 */
  background-color: #f5f5f5; /* 원하는 배경색 */
  display: flex;
  justify-content: center;
  align-items: center;
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
