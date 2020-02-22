import React, { Component } from 'react';
import Hero from './components/Hero';
import Main from './components/Main';

class App extends Component {
  constructor(props) {
    super(props);
    console.log(localStorage.getItem('nhl-digest:theme'));
    this.state = {
      theme: localStorage.getItem('nhl-digest:theme')
    };
  }

  toggleUi = () => {
    const { theme } = this.state;
    this.setState(
      {
        theme: theme === 'light' ? 'dark' : 'light'
      },
      () => {
        localStorage.setItem(
          'nhl-digest:theme',
          theme === 'light' ? 'dark' : 'light'
        );
        console.log(localStorage.getItem('nhl-digest:theme'));
      }
    );
  };

  render = () => {
    const { theme } = this.state;

    if (!this.state) return <div>Loading...</div>;

    return (
      <div>
        {theme === 'dark' && (
          <link rel="stylesheet" href={`/themes/dark.css`} />
        )}
        <Hero toggleUi={this.toggleUi} theme={theme} />
        <div className="container-fluid">
          <Main />
        </div>
      </div>
    );
  };
}

export default App;
