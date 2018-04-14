import React from 'react';
import format from 'date-fns/format';
import { Link } from 'react-router-dom';

const CommentsTile = props => {
  return (
    <div>
      <p>Comments</p>
      <Link to={`/user/${props.id}`}>
        <img src={props.comments.author.image} alt="pictures" />
      </Link>
      <p>{`Name ${props.comments.author.firstName} ${props.comments.author.lastName}`}</p>
      <p>{props.comments.title}</p>
      <p>{props.comments.text}</p>
    </div>
  );
};

export default CommentsTile;
