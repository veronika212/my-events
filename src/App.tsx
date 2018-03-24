import React, { Component } from 'react';

import './App.css';

import { Header, Footer } from './bricks';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header /><button type="button" className="btn btn-primary">Primary</button>
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default App;
