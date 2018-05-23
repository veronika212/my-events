import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';

import { fetchEvents } from '../../ducks/events';
import { Event } from '../../ducks/events';
import { Button } from '../../bricks';

import './upcoming-evetns.css';

interface UpcomingEventsProps {
  fetchEvents: (limit: number) => { type: string; limit: number };
  events: Event[];
  className?: string;
}

class UpcomingEvents extends Component<UpcomingEventsProps> {
  componentDidMount() {
    this.props.fetchEvents(3);
  }

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
              <p className="item-content__info item-content__info_title">{singleEvent.name}</p>
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
    const { className } = this.props;
    return (
      <div className={`upcoming ${className}`}>
        <h4 className="upcoming-title">UPCOMING EVENTS</h4>
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
