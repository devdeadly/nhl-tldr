import React, { Component } from 'react';
import axios from 'axios';
import PlayerCardComponent from './PlayerCard';
import { Link } from 'react-router-dom';
import { Team } from '../models';

class TeamComponent extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    axios.get(`/api/players/${this.props.match.params.id}`)
      .then(({ data }) => {
        let team = new Team(data);
        this.setState(() => ({
          teamName: data.name,
          players: data.roster.roster
        }))
      });
  }
  render = () => {
    if (!this.state){
      return null;
    }

    const { players, teamName } = this.state;
    return (
      <div>
        <nav className="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li><Link to={'/'}>Home</Link></li>
            <li className="is-active"><Link to={''}>{teamName}</Link></li>
          </ul>
        </nav>
        <div className="columns is-multiline">
          {
            players.map((player, i) => {
              return (
                <div key={i} className="column is-full-mobile is-one-third-tablet is-one-quarter-desktop">
                  <PlayerCardComponent {...player} />
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}
export default TeamComponent;