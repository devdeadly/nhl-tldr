import React, { Component } from 'react';
import axios from 'axios';
import PlayerCard from './PlayerCard';
import { Link } from 'react-router-dom';

class TeamComponent extends Component {
  componentDidMount = () => {
    axios.get(`/api/players/${this.props.match.params.id}`).then(({ data }) => {
      this.setState(() => ({
        teamName: data.name,
        players: data.roster.roster
      }));
    });
  };

  removePlayerCard = () => {
    this.setState(() => ({
      removePlayerCard: true
    }));
  };

  render = () => {
    if (!this.state) {
      return (
        <progress className="progress is-large is-primary" max="100"></progress>
      );
    }

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
              <PlayerCard
                key={i}
                {...player}
                removePlayerCard={this.removePlayerCard}
              />
            );
          })}
        </div>
      </div>
    );
  };
}
export default TeamComponent;
