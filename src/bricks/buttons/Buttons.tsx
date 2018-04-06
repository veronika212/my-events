/* import React from 'react';
import { connect } from 'react-redux';

import { fetchEvents } from '../../ducks/events';
import { Event } from '../../ducks/events';
import './buttons.css';

const Buttons = props => {
  const { events } = props;

  return (
    <div>
      <button>Going {props.going}</button>
      <button>Interest {props.interested}</button>
      <button>Like {props.likes}</button>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    events: state.events.data,
  };
};

export default connect(mapStateToProps, { fetchEvents })(Buttons);*/
