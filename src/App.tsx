import React, { Component } from 'react';

import './App.css';

import { Header, Footer } from './bricks';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Footer />
      </div>
    );
  }
}

export default App;
