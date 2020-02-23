import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DEFAULT_PLAYER_PHOTO from '../img/silhouette.jpg';

class PlayerCardComponent extends Component {
  state = {
    showPhoto: false
  };

  getPlayerPhotoUrl(id) {
    return `https://nhl.bamcontent.com/images/headshots/current/168x168/${id}@2x.jpg`;
  }

  showPhoto = () => {
    this.setState({
      showPhoto: true
    });
  };

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

          <figure className="image is-100x100">
            <img
              src={this.getPlayerPhotoUrl(id)}
              onError={e => {
                e.target.src = DEFAULT_PLAYER_PHOTO;
              }}
              onLoad={this.showPhoto}
              alt={fullName}
              className="is-rounded"
              style={{
                display: this.state.showPhoto ? 'block' : 'none'
              }}
            />
            {!this.state.showPhoto && (
              <img
                src={DEFAULT_PLAYER_PHOTO}
                alt="default player"
                className="is-rounded"
              />
            )}
          </figure>
        </div>
      </Link>
    );
  }
}

export default PlayerCardComponent;
