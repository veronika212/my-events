import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchEvents, Event } from '../../ducks/events';
import './landing-page.css';

import EventTile from '../../bricks/event-tile/EventTile';

interface LandingPageProps {
  fetchEvents: () => { type: string };
  events: Event[];
}

class LandingPage extends Component<LandingPageProps> {
  render() {
    const { events } = this.props;
    if (!events) {
      return <div>Loading...</div>;
    }

    return events.map(singleEventTile => {
      return (
        <div className="landing-page" key={singleEventTile.id}>
          <div className="landing-page__events-background">
            <EventTile />
          </div>
        </div>
      );
    });
  }
}

const mapStateToProps = state => {
  return {
    events: state.events.data,
  };
};

export default connect(mapStateToProps, { fetchEvents })(LandingPage);
