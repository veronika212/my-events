import React from 'react';
import format from 'date-fns/format';
import { Link } from 'react-router-dom';

import './event-tile.css';

const EventTile = props => {
  return (
    <div className={`event-tile ${props.className ? props.className : ''}`}>
      <Link to={`/event/${props.id}`}>
        <img className="event-tile__image" src={props.image} alt="pictures" />
      </Link>

      <div className="event-tile__content event-tile_landscape__content">
        <div className="event-tile-date clearfix">
          <div className="event-tile-date__date-day">
            <p className="event-tile-date__date-title">{format(props.startDate, 'DD MMM')}</p>
            <p>{format(props.startDate, 'dd')}</p>
          </div>

          <div className="event-tile-date__info">
            <Link to={`/event/${props.id}`}>
              <p className="event-tile-date__info-title">{props.name}</p>
            </Link>
            <p>{props.county}</p>
          </div>
        </div>

        <div className="event-tile-address event-tile-date_border clearfix">
          <p className="event-tile-address__title">Address:</p>
          <div className="event-tile-address__info">
            <p className="event-tile-address__place">{props.address.place}</p>
            <p>{props.address.street}</p>
            <p>{props.address.city}</p>
            <p>{props.address.zipCode}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventTile;
