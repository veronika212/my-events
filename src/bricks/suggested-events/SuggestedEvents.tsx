import React, { Component } from 'react';
import { connect } from 'react-redux';
import format from 'date-fns/format';

import { Button } from '../../bricks';
import { fetchEvents } from '../../ducks/events';
import { Event } from '../../ducks/events';
import './suggested-events.css';

interface SuggestedEventProps {
  fetchEvents: (limit: number) => { type: string; limit: number };
  events: Event[];
  className?: string;
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
                <p className="item-content__ifno item-content__info_title">{singleEvent.name}</p>
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
    const { className } = this.props;
    return (
      <div className={`suggested ${className}`}>
        <h4 className="suggested-title">SUGGESTED</h4>
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
