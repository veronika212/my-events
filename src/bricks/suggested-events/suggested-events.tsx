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
        <li className="suggested-list__item" key={singleEvent.id}>
          <div className="clearfix">
            <img className="suggested-list__item__image" src={singleEvent.image} alt="pictures" />

            <div className="suggested-list__item__content">
              <p className="suggested-list__item__contenct__date">
                <span>16.april </span>
                {singleEvent.name}
              </p>
              <p>{singleEvent.county}</p>

              <div className="suggested-list__item__participation">
                <button className="suggested-list__item__participation__btn">
                  Going {singleEvent.going}
                </button>

                <button className="suggested-list__item__participation__btn last">
                  Like {singleEvent.likes}
                </button>
              </div>
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
