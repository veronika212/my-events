import React from 'react';
import format from 'date-fns/format';

const EventTile = props => {
  return (
    <div>
      <div>
        <img src={props.image} alt="pictures" />
      </div>

      <div>
        <div>
          <p>{format(props.startDate, 'DD MMM')}</p>
          <p>{format(props.startDate, 'dd')}</p>
        </div>

        <div>
          <p>{props.name}</p>
          <p>{props.county}</p>
        </div>
      </div>
    </div>
  );
};

export default EventTile;
