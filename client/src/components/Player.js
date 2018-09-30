import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Player } from '../models';
import { DEFAULT_PLAYER_PHOTO } from '../constants';

class PlayerComponent extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    axios.get(`/api/player/${this.props.match.params.id}`)
      .then(({ data }) => {
        const player = new Player(data);
        this.setState(() => ({
          player
        }));
      });
  }

  render() {
    if (!this.state) {
      return null;
    }

    const { player: { fullName, teamName, teamId, flagUrl, primaryNumber, nationality, stats, photoUrl } } = this.state;

    return (
      <div>
        <nav className="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li><Link to={'/'}>Home</Link></li>
            <li><Link to={`/team/${teamId}`}>{teamName}</Link></li>
            <li className="is-active"><Link to={''}>{fullName}</Link></li>
          </ul>
        </nav>
        <div className="tile is-ancestor">
          <div className="tile is-vertical">
            <div className="columns">
              <div className="column">
                <div id="stats" style={{ position: 'relative' }}>
                  <div id="player-card" className="card is-hidden-mobile">
                    <div className="card-image">
                      <figure className="image is-square">
                        <img src={photoUrl}
                          onError={(e) => { e.target.src = DEFAULT_PLAYER_PHOTO }}
                          alt={fullName} />
                      </figure>
                    </div>
                    <div className="card-content">
                      <div className="media">
                        <div className="media-content">
                          <p className="title is-4">{fullName}</p>
                          <p className="subtitle">{primaryNumber}</p>
                        </div>
                        <div className="media-right">
                          <figure className="image is-48x48">
                            <img className="is-flag" src={flagUrl} alt={`${nationality} flag`} />
                          </figure>
                        </div>
                      </div>
                    </div>
                  </div>
                  <pre className="notification is-info">
                    {
                      JSON.stringify(this.state.player, null, 2)
                    }
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PlayerComponent;