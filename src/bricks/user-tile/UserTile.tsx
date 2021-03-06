import React from 'react';
import format from 'date-fns/format';
import { Link } from 'react-router-dom';

import './user-tile.css';

const UserTile = props => {
  return (
    <div>
      <img className="user-tile__image" src={props.user.image} alt="avatar" />

      <div className="clearfix user-tile-box">
        <div className="user-tile-box__name">
          <p>Name</p>
          <p>Job</p>
          <p>Age</p>
          <p>Life Motto</p>
        </div>

        <div className="user-tile-box__info">
          <p>{props.user.userName}</p>
          <p>{props.user.job}</p>
          <p>{props.user.age}</p>
          <q className="user-tile-box__motto"> {props.user.favourite.motto} </q>
        </div>
      </div>
    </div>
  );
};

export default UserTile;
