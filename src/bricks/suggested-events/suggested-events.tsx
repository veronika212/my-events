import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchEvents } from '../../ducks/events';
import { Event } from '../../ducks/events';
import './suggested-events.css';

interface SuggestedEventProps {
  fetchEvents: (limit: number) => { type: string; limit: number };
  events: Event[];
}

class SuggestedEvent extends Component<SuggestedEventProps> {
  renderSuggestedEvent = () => {
    const { events } = this.props;
    return events.map(singleEvent => {
      return (
        <li className="suggested__item" key={singleEvent.id}>
          <div>
            <div>
              <img src={singleEvent.image} alt="pictures" />
            </div>

            <div>
              <p>{singleEvent.name}</p>
              <p>{singleEvent.county}</p>
            </div>

            <div>
              <span>16.april</span>
            </div>
          </div>
          <hr className="line" />
        </li>
      );
    });
  };

  render() {
    return (
      <div className="suggested">
        <h4 className="suggested__title">SUGGESTED</h4>
        <ul className="suggested-list">{this.renderSuggestedEvent()}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    events: state.events.data,
  };
};

export default connect(mapStateToProps, { fetchEvents })(SuggestedEvent);
