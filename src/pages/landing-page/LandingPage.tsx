import React, { Component } from 'react';
import { connect } from 'react-redux';

import './landing-page.css';
import { fetchEvents } from '../../ducks/events';

type Props = {
  fetchEvents: () => { type: string };
};

class LandingPage extends Component<Props> {
  componentDidMount() {
    this.props.fetchEvents();
  }

  render() {
    return <div className="landing-page" />;
  }
}

export default connect(null, { fetchEvents })(LandingPage);
