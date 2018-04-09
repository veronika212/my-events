import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';

import { getUpcomingEvents } from '../../ducks/events';
import { Event } from '../../ducks/events';
import { Button } from '../../bricks';

import './upcoming-evetns.css';

interface UpcomingEventsProps {
  events: Event[];
}

class UpcomingEvents extends Component<UpcomingEventsProps> {
  renderUpcomintEvent = () => {
    const { events } = this.props;
    return events.map(singleEvent => {
      return (
        <li className="upcoming-list__item" key={singleEvent.id}>
          <div className="upcoming-list__item__content clearfix">
            <div className="suggested-list__item__date">
              <p className="suggested-list__item__date__date">
                {format(singleEvent.startDate, 'DD MMM')}
              </p>
              <p>{format(singleEvent.startDate, 'dd')}</p>
            </div>

            <div className="upcoming-list__item__info">
              <p className="upcoming-list__item__info__title">{singleEvent.name}</p>
              <p>{singleEvent.county}</p>
            </div>
          </div>

          <div className="upcoming-list__item__participation">
            <Button label={`Going ${singleEvent.going}`} />
            <Button label={`Interest ${singleEvent.interested}`} />
            <Button label={`Like ${singleEvent.likes}`} />
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
    events: getUpcomingEvents(state),
  };
};

export default connect(mapStateToProps)(UpcomingEvents);
