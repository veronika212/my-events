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
        <li className="upcoming-item" key={singleEvent.id}>
          <div className="item-content clearfix">
            <div className="item-content__date">
              <p className="item-content__date item-content__date_title">
                {format(singleEvent.startDate, 'DD MMM')}
              </p>
              <p>{format(singleEvent.startDate, 'dd')}</p>
            </div>

            <div className="item-content__info">
              <p>
                <Link className="item-content__info-title" to={`/event/${singleEvent.id}`}>
                  {singleEvent.name}
                </Link>
              </p>
              <p>{singleEvent.county}</p>
            </div>
          </div>

          <div className="item-participation">
            <Button label={`Going ${singleEvent.going}`} />
            <Button label={`Interest ${singleEvent.interested}`} />
            <Button
              className="item-participation__last-button"
              label={`Like ${singleEvent.likes}`}
            />
          </div>
          <hr className="line" />
        </li>
      );
    });
  };

  render() {
    return (
      <div className="upcoming">
        <h4 className="upcoming-title">UPCOMING EVENTS</h4>
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
