import React, { Component } from 'react';
import Hero from './components/Hero';
import Main from './components/Main';

class App extends Component {

  state = {
    isDarkMode: true
  };

  toggleUi = () => {
    const { isDarkMode } = this.state;
    this.setState(() => ({
      isDarkMode: isDarkMode === true ? false : true
    }));
  }

  render = () => {
    const { isDarkMode } = this.state;

    if (!this.state) {
      return <div>Loading...</div>
    }

    return (
      <div>
        {isDarkMode && (
          <link rel="stylesheet" href={`/themes/dark.css`} />
        )}
        <Hero toggleUi={this.toggleUi} isDarkMode={isDarkMode} />
        <div className="container">
          <Main />
        </div>
      </div>
    );
  }
}
export default App;
