import React, { Component } from 'react';
import axios from 'axios';
import TeamCard from './TeamCard';
import TeamsApi from '../api/teams';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
    }
  }
  
  componentDidMount() {
    axios.get('http://localhost:8000/api/teams')
      .then(({data}) => {
        this.setState(() => ({
          teams: data
        }));
      });
  }

  render() {
    const {teams} = this.state;
    return (
        <div className="columns is-multiline">
          {
            teams.map(team => {
              return (
                <div className="column is-2">
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