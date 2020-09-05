import React from 'react';
import './header.css';
import LanguageIcon from '@material-ui/icons/Language';
import {Avatar} from '@material-ui/core';

const Header = () => {
  return (
    <div className="header">
      <img
        src="https://i.pinimg.com/originals/3c/bf/be/3cbfbe148597341fa56f2f87ade90956.png"
        alt="COVID-19"
        className="header_icon"
      />
      <div className="header_right">
        <LanguageIcon />
        <Avatar />
      </div>
    </div>
  );
};

export default Header;
