import React, { Component } from 'react';

import './landing-page.css';

import UpcomingEvents from '../../bricks/upcoming-events/UpcomingEvents';
import SuggestedEvents from '../../bricks/suggested-events/SuggestedEvents';

class LandingPage extends Component {
  render() {
    return (
      <div className="landing-page">
        <div className="landing-page__events-background">
          <div className="container">
            <div className="row no-gutters">
              <div className="col-md-8 col-lg-4">
                <UpcomingEvents />
              </div>
              <div className="col-md-8 col-lg-4">
                <SuggestedEvents />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
