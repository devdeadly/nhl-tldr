import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class PlayerCard extends Component {

  state = {
    imageUrl: '',
    fullName: `${this.props.firstName} ${this.props.lastName}`,
  }

  constructor(props) {
    super(props);
    console.log(props);
  }
  componentDidMount() {
    console.log(this.state.fullName);
  }
  render() {
    const { jerseyNumber, playerId } = this.props;
    const { fullName } = this.state;

    return (
      <Link to="/">
        <div className="card has-text-centered">
          <div className="card-image">
            <figure className="image is-square">
              <img src={`https://nhl.bamcontent.com/images/headshots/current/168x168/${playerId}@2x.jpg`} />
            </figure>
          </div>
          <div className="card-content">
            <div className="content">
              <h2 className="is-size-2">{jerseyNumber}</h2>
              <h4 className="is-size-4">{fullName}</h4>
            </div>
          </div>
        </div>
      </Link>
    )
  }
}