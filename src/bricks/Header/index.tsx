import React from 'react';

import './header.css';
import Menu from './menu';

const Header = () => (
  <div className="header">
    <div className="jumbotron">
      <Menu />
    </div>
  </div>
);

export default Header;
