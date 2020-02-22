import React, { Component } from 'react';
import axios from 'axios';
import TeamCard from './TeamCard';

class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: []
    };
  }

  componentDidMount() {
    axios.get(`/api/teams`).then(({ data }) => {
      console.log('data', data);
      this.setState(() => ({
        teams: data
      }));
    });
  }

  render() {
    const { teams } = this.state;
    if (!teams.length) return <div className="loader" />;
    return (
      <div className="columns is-multiline">
        {teams.map((team, i) => {
          return (
            <div
              key={i}
              className="column is-half-tablet is-one-third-widescreen"
            >
              <TeamCard {...team} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default HomeComponent;
