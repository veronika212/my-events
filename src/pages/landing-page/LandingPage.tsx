import React, { Component } from 'react';
import { connect } from 'react-redux';

import './landing-page.css';
import { fetchEvents, Event } from '../../ducks/events';
import UpcomingEvents from '../../bricks/upcoming-events/UpcomingEvents';
import SuggestedEvents from '../../bricks/suggested-events/suggested-events';
import EventTile from '../../bricks/event-tile/EventTile';

interface LandingPageProps {
  fetchEvents: (limit?: number) => { type: string; limit: number };
  events: Event[];
}

class LandingPage extends Component<LandingPageProps> {
  componentDidMount() {
    this.props.fetchEvents();
  }

  renderTiles() {
    const { events } = this.props;
    return events.map(singleEventTile => {
      return (
        <EventTile
          key={singleEventTile.id}
          name={singleEventTile.name}
          image={singleEventTile.image}
          county={singleEventTile.county}
          startDate={singleEventTile.startDate}
          address={singleEventTile.address}
        />
      );
    });
  }

  render() {
    const { events } = this.props;

    if (!events) {
      return <div>Loading...</div>;
    }

    return (
      <div className="landing-page">
        <div className="landing-page__events-background">
          <UpcomingEvents />
          <SuggestedEvents />
        </div>
        <div className="event-tiles-list">{this.renderTiles()}</div>
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
