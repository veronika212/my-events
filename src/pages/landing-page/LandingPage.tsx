import React, { Component } from 'react';

import './landing-page.css';

import UpcomingEvents from '../../bricks/upcoming-events/UpcomingEvents';
import SuggestedEvents from '../../bricks/suggested-events/suggested-events';

class LandingPage extends Component {
  render() {
    return (
      <div className="landing-page">
        <UpcomingEvents />
        <SuggestedEvents />
      </div>
    );
  }
}

export default LandingPage;
