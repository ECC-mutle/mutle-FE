/** @jsxImportSource @emotion/react */

import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import styled from '@emotion/styled';
//import Button from './components/Button/Button';
//import Input from './components/Input';
//import Header from './components/Header/Header';
import { withdraw } from './api/auth';

function App() {
  const handleWithdraw = async () => {
    const password = prompt('계정을 삭제하려면 비밀번호를 입력하세요.');
    if (!password) return;

    if (!window.confirm('정말로 탈퇴하시겠습니까? 모든 데이터가 삭제됩니다.'))
      return;

    try {
      const token = localStorage.getItem('myToken');
      await withdraw(password, token);

      localStorage.removeItem('myToken');
      alert('회원 탈퇴가 완료되었습니다.');
      window.location.reload();
    } catch (error) {
      alert('비밀번호가 틀렸거나 탈퇴 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className='App'>
      {/* 3. 버튼이 있어야 클릭해서 실행할 수 있겠죠? */}
      <button
        onClick={handleWithdraw}
        style={{ backgroundColor: 'red', color: 'white', padding: '10px' }}
      >
        회원 탈퇴하기
      </button>
    </div>
  );
}

export default App;
