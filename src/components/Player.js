import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Player extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    axios.get(`http://localhost:8000/api/player/${this.props.match.params.id}`)
      .then(({ data }) => {
        console.log(data);
        this.setState(() => ({
          id: data.id,
          fullName: data.fullName,
          primaryNumber: data.primaryNumber,
          birthDate: data.birthDate,
          position: data.primaryPosition.name,
          weight: data.weight,
          height: data.height,
          nationality: data.nationality,
          birthCountry: data.birthCountry,
          birthCity: data.birthCity,
          currentAge: data.currentAge,
          teamId: data.currentTeam.id,
          teamName: data.currentTeam.name
        }));
      });
  }

  render() {
    if (!this.state) {
      return null;
    }
    return (
      <div>
        <nav className="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li><Link to={'/'}>Home</Link></li>
            <li><Link to={`/team/${this.state.teamId}`}>{this.state.teamName}</Link></li>
            <li className="is-active"><Link to={''}>{this.state.fullName}</Link></li>
          </ul>
        </nav>
        <pre>
          {JSON.stringify(this.state.data, null, 2)}
        </pre>
      </div>
    )
  }
}

export default Player;