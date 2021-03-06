import React, { Component } from 'react';
import { connect } from 'react-redux';
import format from 'date-fns/format';
import { Link } from 'react-router-dom';

import { Button } from '../../bricks';
import { getSugestedEvents } from '../../ducks/events';
import { Event } from '../../ducks/events';
import './suggested-events.css';

interface SuggestedEventProps {
  events: Event[];
}

class SuggestedEvent extends Component<SuggestedEventProps> {
  renderSuggestedEvent = () => {
    const { events } = this.props;
    return events.map(singleEvent => {
      return (
        <li className="suggested-item" key={singleEvent.id}>
          <div className="clearfix">
            <img className="item-image" src={singleEvent.image} alt="pictures" />

            <div className="item-content">
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

              <div className="item-participation">
                <Button type="danger" label={`Going ${singleEvent.going}`} />
                <Button
                  className="item-participation__last-button"
                  label={`Like ${singleEvent.likes}`}
                />
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
        <h4 className="suggested-title">SUGGESTED</h4>
        <ul className="suggested-list">{this.renderSuggestedEvent()}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    events: getSugestedEvents(state),
  };
};

export default connect(mapStateToProps)(SuggestedEvent);
