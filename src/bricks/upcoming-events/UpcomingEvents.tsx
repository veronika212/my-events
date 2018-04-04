import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchEvents } from '../../ducks/events';
import { Event } from '../../ducks/events';
import './upcoming-evetns.css';

interface UpcomingEventsProps {
  fetchEvents: (limit: number) => { type: string; limit: number };
  events: Event[];
}

class UpcomingEvents extends Component<UpcomingEventsProps> {
  componentDidMount() {
    this.props.fetchEvents(3);
  }

  renderUpcomintEvent = () => {
    const { events } = this.props;
    return events.map(singleEvent => {
      return (
        <li className="upcoming-list__item" key={singleEvent.id}>
          <div className="upcoming-list__item__content clearfix">
            <div className="upcoming-list__item__content__date">
              <p className="upcoming-list__item__content__date__day">APR 23</p>
              <p>F</p>
            </div>

            <div className="upcoming-list__item__info">
              <p className="upcoming-list__item__info__title">{singleEvent.name}</p>
              <p>{singleEvent.county}</p>
            </div>
          </div>

          <div className="upcoming-list__item__participation">
            <button className="upcoming-list__item__participation__btn">
              Going {singleEvent.going}
            </button>
            <button className="upcoming-list__item__participation__btn">
              Interested {singleEvent.interested}
            </button>
            <button className="upcoming-list__item__participation__btn last">
              Like {singleEvent.likes}
            </button>
          </div>
          <hr className="line" />
        </li>
      );
    });
  };

  render() {
    return (
      <div className="upcoming">
        <h4 className="upcoming__title">UPCOMING EVENTS</h4>
        <ul className="upcoming-list">{this.renderUpcomintEvent()}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    events: state.events.data,
  };
};

export default connect(mapStateToProps, { fetchEvents })(UpcomingEvents);
