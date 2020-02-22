import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DEFAULT_PLAYER_PHOTO } from '../constants';

class PlayerCardComponent extends Component {
  getPlayerPhotoUrl(id) {
    return `https://nhl.bamcontent.com/images/headshots/current/168x168/${id}@2x.jpg`;
  }

  render() {
    const {
      person: { id, fullName }, // off the person property I want id and fullName
      position: { name: position }, // off the position property I want name and I want to call it positionName
      jerseyNumber
    } = this.props;

    return (
      <Link to={`/player/${id}`}>
        {/* MOBILE VIEW */}
        <div className="mobile-card">
          <div>
            <p className="title is-5 has-text-weight-bold">{fullName}</p>
            <p className="subtitle is-6">{position}</p>
            <p className="title is-4">{jerseyNumber ? jerseyNumber : ''}</p>
          </div>

          <figure className="image  is-128x128">
            <img
              src={this.getPlayerPhotoUrl(id)}
              onError={e => {
                e.target.src = DEFAULT_PLAYER_PHOTO;
              }}
              alt={fullName}
              class="is-rounded"
            />
          </figure>
        </div>
      </Link>
    );
  }
}

export default PlayerCardComponent;
