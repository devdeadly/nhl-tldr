import React from 'react';
import { Link } from 'react-router-dom';
import TeamsApi from '../api/teams';

export default ({ name, id }) => (
  <Link to={`/team/${id}`}>
    {/* MOBILE VIEW */}
    <div className="mobile-card ">
      <div>
        <p className="title is-5 has-text-weight-bold">{name}</p>
      </div>

      <figure className="image  is-128x128">
        <img src={`/teams/${getTeamImageUrl(id)}`} alt={`${name} Logo`} />
      </figure>
    </div>
    {/* DESKTOP VIEW */}
  </Link>
);

const getTeamImageUrl = id => {
  const team = TeamsApi.find(team => team.id === id);
  return team.imageUrl;
};
