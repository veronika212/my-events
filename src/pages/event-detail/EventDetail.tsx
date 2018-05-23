import React, { Component } from 'react';
import { connect } from 'react-redux';
import format from 'date-fns/format';

import { fetchEventDetail, EventDetailModel } from '../../ducks/events';
import { Loading } from '../../bricks';
import { Button } from '../../bricks';
import UserTile from '../../bricks/user-tile/UserTile';
import CommentTile from '../../bricks/comment-tile/CommentTile';
import './EventDetail.css';

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

  renderUserTile() {
    const { eventDetail } = this.props;

    return <UserTile user={eventDetail.user} />;
  }

  renderCommentsTile() {
    const { eventDetail } = this.props;

    return (
      <div>
        <h4 className="comments-title">Comments</h4>
        <ul>
          {eventDetail.comments.map(comment => <CommentTile key={comment.id} comments={comment} />)}
        </ul>
      </div>
    );
  }

  render() {
    const { eventDetail } = this.props;
    if (!eventDetail) {
      return <Loading />;
    }

    return (
      <div className="container-fluid">
        <div className="event-detail">
          <div className="row event-detail__content-wrapper">
            <div className="d-none d-xl-block col-lg-3 user-tile">{this.renderUserTile()}</div>
            <div className="col-sm-12 col-xl-6 event-detail__content">
              <img
                className="col-xl-6 event-detail__image"
                src={eventDetail.image}
                alt="pictures"
              />

              <div className="event-detail__border">
                <div>
                  <div className="basic-info clearfix">
                    <div className="basic-info__start-date">
                      <p className="basic-info__number-day">
                        {format(eventDetail.startDate, 'DD MMM')}
                      </p>
                      <p>{format(eventDetail.startDate, 'dd')}</p>
                    </div>

                    <div className="basic-info__place-event">
                      <p className="basic-info__title-event">{eventDetail.name}</p>
                      <p>{eventDetail.county}</p>
                    </div>
                  </div>

                  <div className="item-participation">
                    <Button label={`Going ${eventDetail.going}`} />
                    <Button label={`Interest ${eventDetail.interested}`} />
                    <Button
                      className="item-participation__last-button"
                      label={`Like ${eventDetail.likes}`}
                    />
                  </div>
                </div>
                <hr />

                <div>
                  <div className="information">
                    <p className="information__dark-text">{`${format(
                      eventDetail.endDate,
                      'dddd'
                    )} ${'from'} ${format(eventDetail.startDate, 'HH:mm')} ${'to'} ${format(
                      eventDetail.endDate,
                      'dddd'
                    )} ${format(eventDetail.endDate, 'HH:mm')}`}</p>

                    <p className="information__light-text">{`${'from'} ${format(
                      eventDetail.startDate,
                      'DD MMMM'
                    )} ${'to'} ${format(eventDetail.endDate, 'DD MMMM')}`}</p>
                  </div>

                  <div className="information">
                    <p className="information__dark-text">{eventDetail.address.place}</p>
                    <p className="information__light-text">{eventDetail.category}</p>
                  </div>

                  <div className="information__address">
                    <span className="information__dark-text">Address</span>
                    <p className="information__light-text">{`${eventDetail.address.street}, ${
                      eventDetail.address.city
                    } ${eventDetail.address.zipCode}, ${eventDetail.address.state}`}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 user-tile">{this.renderUserTile()}</div>
          </div>

          <div className="col-xl-12 description-box">
            <p className="description-box__title">Description event </p>
            <p>{eventDetail.description}</p>
          </div>

          <div>{this.renderCommentsTile()}</div>
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
