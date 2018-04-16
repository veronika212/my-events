import React from 'react';
import format from 'date-fns/format';
import { Link } from 'react-router-dom';

import './comments-tile.css';

const CommentsTile = props => {
  return (
    <div className="clearfix comments-tile">
      <Link to={`/user/${props.id}`}>
        <img className="comments-tile__image" src={props.comments.author.image} alt="pictures" />
      </Link>
      <div className="comments-tile__info">
        <p className="comments-tile__info-author">{`Name ${props.comments.author.firstName} ${
          props.comments.author.lastName
        }`}</p>
        <p className="comments-tile__info-title">{props.comments.title}</p>
        <p className="comments-tile__info-text">{props.comments.text}</p>
      </div>
    </div>
  );
};

export default CommentsTile;
