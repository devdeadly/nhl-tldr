import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DEFAULT_PLAYER_PHOTO } from '../constants';

export default class PlayerCardComponent extends Component {

  getPlayerPhotoUrl(id) {
    return `https://nhl.bamcontent.com/images/headshots/current/168x168/${id}@2x.jpg`;
  }
  render() {
    const {
      person: { id, fullName },  // off the person property I want id and fullName
      position: { name: position }, // off the position property I want name and I want to call it positionName
      jerseyNumber
    } = this.props
    return (
      <Link to={`/player/${id}`}>
        <div className="card">
          <div className="card-image">
            <figure className="image is-square">
              <img src={this.getPlayerPhotoUrl(id)}
                onError={(e) => { e.target.src = DEFAULT_PLAYER_PHOTO }}
                alt={fullName} />
            </figure>
          </div>
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="title is-4">{fullName}</p>
                <p className="subtitle">{position}</p>
              </div>
              <div className="media-right">
                <h2 className="title is-2">{jerseyNumber ? jerseyNumber : ''}</h2>
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }
};