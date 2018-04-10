import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEventDetail } from '../../ducks/events';

interface EventDetailProps {
  fetchEventDetail: (id: number) => { type: string; id: number };
  match: any;
}

class EventDetail extends Component<EventDetailProps> {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchEventDetail(id);
  }

  render() {
    return <div>Event Detail</div>;
  }
}

export default connect(null, { fetchEventDetail })(EventDetail);
