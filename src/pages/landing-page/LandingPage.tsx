import React, { Component } from 'react';
import { connect } from 'react-redux';

import './landing-page.css';
import { fetchEvents, Event } from '../../ducks/events';
import UpcomingEvents from '../../bricks/upcoming-events/UpcomingEvents';
import SuggestedEvents from '../../bricks/suggested-events/suggested-events';
import EventTile from '../../bricks/event-tile/EventTile';

interface LandingPageProps {
  fetchEvents: () => { type: string; limit: null };
  events: Event[];
}

class LandingPage extends Component<LandingPageProps> {
  renderTiles() {
    const { events } = this.props;
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

  render() {
    const { events } = this.props;

    if (!events) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <div className="landing-page__events-background">
          <UpcomingEvents />
          <SuggestedEvents />
        </div>
        <div>{this.renderTiles()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    events: state.events.data,
  };
};

export default connect(mapStateToProps, { fetchEvents })(LandingPage);
