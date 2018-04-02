import * as React from 'react';
import { NavLink } from 'react-router-dom';

import './menu.css';

const Menu = () => (
  <nav className="menu nav nav-pills">
    <li className="nav-item">
      <NavLink exact={true} to="/" activeClassName="active" className="nav-link">
        Events
      </NavLink>
    </li>

    <li className="nav-item">
      <NavLink exact={true} to="/event/create" activeClassName="active" className="nav-link">
        Create Event
      </NavLink>
    </li>

    <li className="nav-item">
      <NavLink exact={true} to="/users" activeClassName="active" className="nav-link">
        Users
      </NavLink>
    </li>

    <li className="nav-item">
      <NavLink exact={true} to="/user/create" activeClassName="active" className="nav-link">
        Create User
      </NavLink>
    </li>
  </nav>
);

export default Menu;
