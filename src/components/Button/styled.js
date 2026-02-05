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
    padding: '5px 10px',
    fontSize: '8px',
    borderRadius: '40px',
  },
  md: {
    padding: '5px 20px',
    fontSize: '10px',
    borderRadius: '50px',
  },
  lg: {
    padding: '8px 20px',
    fontSize: '13px',
    borderRadius: '50px',
  },
  Hsize: {
    padding: '5px 8px',
    fontSize: '8px',
    borderRadius: '10px',
  },
};

export const BaseButton = styled.button(
  ({ variant = 'primary', size = 'md', disabled, liked = false }) => {
    const v = variantStyles[variant] ?? variantStyles.primary;
    const s = sizeStyles[size] ?? sizeStyles.md;

    return {
      /* 1. 기본 공통 스타일 (.btn) */
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '3px',
      fontWeight: 600,
      borderRadius: s.borderRadius,
      cursor: disabled ? 'not-allowed' : 'pointer',
      border: `0.8px solid ${v.border ?? 'transparent'}`,
      outline: 'none',
      alignItems: 'center',
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
