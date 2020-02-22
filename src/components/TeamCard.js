import React from 'react';
import { Link } from 'react-router-dom';
import TeamsApi from '../api/teams';

export default (props) => (
  <Link to={`/team/${props.id}`}>
    <div className="card">
      <div className="card-image">
        <figure className="image is-4by3">
          <img src={`/teams/${getTeamImageUrl(props.id)}`} alt={`${props.name} Logo`}/>
        </figure>
      </div>
      <div className="card-content">
        <div className="content">
          <strong>
            {props.name}
          </strong>
        </div>
      </div>
    </div>
  </Link>
);

const getTeamImageUrl = (id) => {
  const team = TeamsApi.find((team) => team.id === id);
  return team.imageUrl;
}