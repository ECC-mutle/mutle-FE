import React from 'react';
import { HeaderWrapper, HeaderBox, LogoImage } from './styled';
import logo from '../../assets/images/mutle_forppt.png';

const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderBox>
        <LogoImage src={logo} alt='Mutle logo' />
      </HeaderBox>
    </HeaderWrapper>
  );
};

export default Header;
