import React, { Component } from 'react';
import { connect } from 'react-redux';

import './landing-page.css';

import EventTile from '../../bricks/event-tile/EventTile';

class LandingPage extends Component {
  render() {
    return (
      <div className="landing-page">
        <div className="landing-page__events-background">
          <EventTile />
        </div>
      </div>
    );
  }
}

export default LandingPage;
