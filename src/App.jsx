import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import styled from '@emotion/styled';
import Button from './components/Button';
import Input from './components/Input';
import Header from './components/Header';

// 2. Styled 컴포넌트 정의
const StyledButton = styled.button`
  background-color: hotpink;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href='https://vite.dev' target='_blank' rel='noreferrer'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank' rel='noreferrer'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>

      {/* 3. Emotion css 프롭 테스트 영역 */}

      <div
        css={{
          color: 'blue',
          fontWeight: 'bold',
          fontSize: '24px',
          marginBottom: '20px',
        }}
      >
        Emotion 설정 완료!
      </div>

      <h1>Vite + React</h1>

      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

        <br />

        {/* 4. Styled 컴포넌트 사용 테스트 */}

        <StyledButton onClick={() => alert('Emotion 작동 확인!')}>
          Emotion 핑크 버튼
        </StyledButton>

        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>

      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
