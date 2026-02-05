import styled from '@emotion/styled';

/* variant 스타일 정의 */
const variantStyles = {
  primary: {
    background: '#4fabe9',
    color: '#ffffff',
    hover: '#4fabe9' /*배경색과 동일함.*/,
  },
  secondary: {
    background: '#ffffff',
    color: '#4FABE9',
    hover: '#ffffff',
  },
  yes: {
    background: '#A1D2F3',
    color: '#ffffff',
    hover: '#A1D2F3',
  },
  no: {
    background: '#000000',
    color: '#ffffff',
    hover: '#000000',
  },
  friendrequest: {
    background: '#4285F4',
    color: '#ffffff',
  },
  heart: {
    background: '#ffffff',
    color: '#000000',
    border: '#000000',
    activeBackground: '#FF2727',
    activecolor: '#ffffff',
  },
  danger: {
    background: '#dc3545',
    color: '#ffffff',
    hover: '#c82333',
  },
  BackToHome: {
    background: '#4FABE9',
    color: '#ffffff',
  },
  friendrequestreject: {
    background: '#4FABE9',
    color: '#ffffff',
  },
  login_1: {
    background: '#000000',
    color: '#ffffff',
  },
  login_2: {
    background: '#E3E4E4',
    color: '#B8B7B6',
    border: '#A1A1A1',
  },
};

/* size 스타일 정의 */
const sizeStyles = {
  sm: {
    padding: '10px 10px',
    fontSize: '13px',
  },
  md: {
    padding: '10px 10px',
    fontSize: '15px',
  },
  lg: {
    padding: '10px 10px',
    fontSize: '18px',
  },
};

export const BaseButton = styled.button(
  ({ variant = 'primary', size = 'md', disabled, liked = false }) => {
    const v = variantStyles[variant];
    const s = sizeStyles[size];

    return {
      /* 1. 기본 공통 스타일 (.btn) */
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      borderRadius: '1px',
      fontWeight: 600,
      cursor: disabled ? 'not-allowed' : 'pointer',
      border: `1px solid ${v.border ?? 'transparent'}`,
      outline: 'none',
      transition: 'all 0.2s ease',

      /* 2. size */
      padding: s.padding,
      fontSize: s.fontSize,

      /* 3. variant */
      backgroundColor:
        liked && v.activeBackground ? v.activeBackground : v.background,

      color: liked && v.activecolor ? v.activecolor : v.color,

      /* 4. disabled */
      opacity: disabled ? 0.5 : 1,
      filter: disabled ? 'grayscale(1)' : 'none',

      /* 5. hover */
      '&:hover': {
        backgroundColor: !disabled ? v.hover : v.background,
      },
    };
  },
);
