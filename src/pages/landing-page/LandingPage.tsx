import React, { Component } from 'react';

import './landing-page.css';

import UpcomingEvents from '../../bricks/upcoming-events/UpcomingEvents';

class LandingPage extends Component {
  render() {
    return (
      <div className="landing-page">
        <UpcomingEvents />
      </div>
    );
  }
}

export default LandingPage;
