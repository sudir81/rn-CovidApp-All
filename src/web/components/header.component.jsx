import React from 'react';
import './header.css';
import LanguageIcon from '@material-ui/icons/Language';
import {Avatar} from '@material-ui/core';
import covidImg from '../../images/covid.png';

const Header = () => {
  return (
    <div className="header">
      <img src={covidImg} alt="COVID-19" className="header_icon" />
      <div className="header_right">
        <LanguageIcon />
        <Avatar />
      </div>
    </div>
  );
};

export default Header;
