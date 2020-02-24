import React, { Component } from 'react';
import axios from 'axios';
import PlayerCard from './PlayerCard';
import { Link } from 'react-router-dom';

class TeamComponent extends Component {
  componentDidMount = () => {
    axios.get(`/api/roster/${this.props.match.params.id}`).then(({ data }) => {
      this.setState(() => ({
        teamName: data.name,
        players: data.roster.roster
      }));
    });
  };

  render = () => {
    if (!this.state) return <div className="loader" />;

    const { players, teamName } = this.state;

    return (
      <div>
        <nav className="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li>
              <Link to={'/'}>Home</Link>
            </li>
            <li className="is-active">
              <Link to={''}>{teamName}</Link>
            </li>
          </ul>
        </nav>
        <div className="columns is-multiline">
          {players.map((player, i) => {
            return (
              <div
                key={i}
                className="column is-half-tablet is-one-third-widescreen"
              >
                <PlayerCard {...player} />
              </div>
            );
          })}
        </div>
      </div>
    );
  };
}
export default TeamComponent;
