import React, { Component } from 'react';
import axios from 'axios';
import TeamCard from './TeamCard';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8000/api/teams')
      .then(({ data }) => {
        this.setState(() => ({
          teams: data
        }));
      });
  }

  render() {
    const { teams } = this.state;
    return (
      <div className="columns is-multiline is-mobile">
        {
          teams.map((team, i) => {
            return (
              <div key={i} className="column is-half-mobile is-one-third-tablet is-one-quarter-desktop">
                <TeamCard {...team} />
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default Home;