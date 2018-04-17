import React from 'react';
import format from 'date-fns/format';
import { Link } from 'react-router-dom';

import './comment-tile.css';

const CommentTile = props => {
  const { comments } = props;
  return (
    <li className="clearfix comments-tile">
      <Link to={`/user/${comments.id}`}>
        <img className="comments-tile__image" src={comments.author.image} alt="pictures" />
      </Link>
      <div className="comments-tile__info">
        <p className="comments-tile__info-author">{`Name ${comments.author.firstName} ${
          comments.author.lastName
        }`}</p>
        <p className="comments-tile__info-title">{comments.title}</p>
        <p className="comments-tile__info-text">{comments.text}</p>
      </div>
    </li>
  );
};

export default CommentTile;
