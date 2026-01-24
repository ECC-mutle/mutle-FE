import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  // 1. 기본 자바스크립트 권장 설정 적용
  js.configs.recommended,
  // 2. 리액트 권장 설정 적용
  pluginReact.configs.flat.recommended,
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: { js },
    extends: ['airbnb-base', 'prettier'],
    languageOptions: { globals: globals.browser },

    //아래가 팀 규칙에 해당하는 부분.
    rules: {
      // ESLint 연결하고 나오는 에러들 막는 규칙. = Vite/React +17 환경에서 필요 없는 규칙 끄기
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-no-target-blank': 'off',

      // 팀원 상의 후 추가 규칙 넣기
    },
  },
]);
