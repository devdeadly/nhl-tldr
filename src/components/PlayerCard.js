import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class PlayerCard extends Component {

  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    const { person: {id, fullName}, jerseyNumber } = this.props
    return (
      <Link to="/">
        <div className="card has-text-centered">
          <div className="card-image">
            <figure className="image is-square">
              <img src={`https://nhl.bamcontent.com/images/headshots/current/168x168/${id}@2x.jpg`} onError={(e) => {e.target.src="http://localhost:8000/static/default.png"}} alt={fullName}/>
            </figure>
          </div>
          <div className="card-content">
            <div className="content">
              <h2 className="is-size-2">{jerseyNumber ? jerseyNumber : 'n/a'}</h2>
              <h4 className="is-size-4">{fullName}</h4>
            </div>
          </div>
        </div>
      </Link>
    )
  }
}