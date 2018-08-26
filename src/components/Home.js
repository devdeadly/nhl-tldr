import React, { Component } from 'react';
import axios from 'axios';
import PlayerCard from './PlayerCard';
import TeamCard from './TeamCard';
import TeamsAPI from '../teams';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: '',
      teams: [],
      players: [],
      test: [1,2]
    }
  }
  
  componentDidMount() {
    axios.get('http://localhost:8000/api/teams')
      .then(resp => {
        this.setState(() => ({
          teams: resp.data.teams.data
        }));
      });
  }

  render() {
    return (
        <div className="columns is-multiline">
          {
            TeamsAPI.teams.map(team => {
              return (
                <div className="column is-one-quarter">
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