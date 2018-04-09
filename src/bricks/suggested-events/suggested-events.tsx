import React, { Component } from 'react';
import { connect } from 'react-redux';
import format from 'date-fns/format';

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
        <li className="suggested-list__item" key={singleEvent.id}>
          <div className="clearfix">
            <img className="suggested-list__item__image" src={singleEvent.image} alt="pictures" />

            <div className="suggested-list__item__content">
              <div className="suggested-list__item__date">
                <p className="suggested-list__item__date__date">
                  {format(singleEvent.startDate, 'DD MMM')}
                </p>
                <p>{format(singleEvent.startDate, 'dd')}</p>
              </div>

              <div>
                <p className="suggested-list__item__name">{singleEvent.name}</p>
                <p>{singleEvent.county}</p>
              </div>

              <div className="suggested-list__item__participation">
                <Button type="danger" label={`Going ${singleEvent.going}`} />
                <Button label={`Like ${singleEvent.likes}`} />
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
    events: getSugestedEvents(state),
  };
};

export default connect(mapStateToProps)(SuggestedEvent);
