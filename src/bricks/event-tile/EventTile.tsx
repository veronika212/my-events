import React from 'react';
import format from 'date-fns/format';
import { Link } from 'react-router-dom';

import './event-tile.css';

const EventTile = props => {
  const { id, image, startDate, name, county, address } = props;
  return (
    <div className="event-tile">
      <Link to={`/event/${id}`}>
        <img className="event-tile__image" src={image} alt="pictures" />
      </Link>

      <div className="event-tile__content">
        <div className="event-tile-date clearfix">
          <div className="event-tile-date__date-day">
            <p className="event-tile-date__date-title">{format(startDate, 'DD MMM')}</p>
            <p>{format(startDate, 'dd')}</p>
          </div>

          <div className="event-tile-date__info">
            <Link to={`/event/${props.id}`}>
              <p className="event-tile-date__info-title">{name}</p>
            </Link>
            <p>{county}</p>
          </div>
        </div>

        <div className="event-tile-address event-tile-date_border clearfix">
          <p className="event-tile-address__title">Address:</p>
          <div className="event-tile-address__info">
            <p className="event-tile-address__place">{address.place}</p>
            <p>{address.street}</p>
            <p>{address.city}</p>
            <p>{address.zipCode}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventTile;
