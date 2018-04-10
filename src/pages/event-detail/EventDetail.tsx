import React, { Component } from 'react';
import { connect } from 'react-redux';
import format from 'date-fns/format';

import { fetchEventDetail, EventDetailModel } from '../../ducks/events';
import { Loading } from '../../bricks';
import { Button } from '../../bricks';

interface EventDetailProps {
  fetchEventDetail: (id: number) => { type: string; id: number };
  eventDetail: EventDetailModel;
  match: any;
}

class EventDetail extends Component<EventDetailProps> {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchEventDetail(id);
  }

  render() {
    const { eventDetail } = this.props;
    if (!eventDetail) {
      return <Loading />;
    }
    return (
      <div>
        <img src={eventDetail.image} alt="pictures" />
        <div>
          <p>{format(eventDetail.startDate, 'DD MMM')}</p>
          <p>{format(eventDetail.startDate, 'dd')}</p>
        </div>
        <div>
          <p>{eventDetail.name}</p>
          <p>{eventDetail.county}</p>
        </div>
        <div className="item-participation">
          <Button label={`Going ${eventDetail.going}`} />
          <Button label={`Interest ${eventDetail.interested}`} />
          <Button className="item-participation__last-button" label={`Like ${eventDetail.likes}`} />
        </div>
        <hr className="line" />
        <div>
          <p>{`${'From'} ${format(eventDetail.startDate, 'DD MMMM')} ${format(
            eventDetail.startDate,
            'dddd'
          )}`}</p>
          <p>{`${'To'} ${format(eventDetail.endDate, 'DD MMMM')} ${format(
            eventDetail.endDate,
            'dddd'
          )}`}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    eventDetail: state.eventDetail,
  };
};

export default connect(mapStateToProps, { fetchEventDetail })(EventDetail);
