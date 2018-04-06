import React, { Component } from 'react';

import './landing-page.css';

import UpcomingEvents from '../../bricks/upcoming-events/UpcomingEvents';
import SuggestedEvents from '../../bricks/suggested-events/suggested-events';

class LandingPage extends Component {
  render() {
    return (
      <div className="landing-page">
        <div className="landing-page__events-background">
          <UpcomingEvents />
          <SuggestedEvents />
        </div>
      </div>
    );
  }
}

export default LandingPage;
