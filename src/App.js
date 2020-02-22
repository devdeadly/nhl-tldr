import React, { Component } from 'react';
import Hero from './components/Hero';
import Main from './components/Main';

class App extends Component {
  render = () => {
    return (
      <div>
        <Hero />
        <div className="container-fluid">
          <Main />
        </div>
      </div>
    );
  };
}

export default App;
