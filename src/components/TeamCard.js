import React from 'react';
import { Link } from 'react-router-dom';
import TeamsApi from '../api/teams';

export default ({ id, name, rank, gp, w, l, ot, p, rw, row }) => {
  return (
    <Link to={`/team/${id}`}>
      <div className="neumorphic-card">
        <span className="tag is-info">{rank}</span>
        <div>
          <p className="is-5 has-text-weight-bold">{name}</p>
          <nav className="level is-mobile has-text-centered">
            <div className="level-item">
              <div>
                <p className="heading">P</p>
                <p className="subtitle">{p}</p>
              </div>
            </div>
            <div className="level-item">
              <div>
                <p className="heading">GP</p>
                <p className="subtitle">{gp}</p>
              </div>
            </div>
            <div className="level-item">
              <div>
                <p className="heading">W</p>
                <p className="subtitle">{w}</p>
              </div>
            </div>
            <div className="level-item">
              <div>
                <p className="heading">L</p>
                <p className="subtitle">{l}</p>
              </div>
            </div>
            <div className="level-item">
              <div>
                <p className="heading">OT</p>
                <p className="subtitle">{ot}</p>
              </div>
            </div>
            <div className="level-item">
              <div>
                <p className="heading">RW</p>
                <p className="subtitle">{rw}</p>
              </div>
            </div>
            <div className="level-item">
              <div>
                <p className="heading">ROW</p>
                <p className="subtitle">{row}</p>
              </div>
            </div>
          </nav>
        </div>
        <figure className="image is-64x64">
          <img src={`/teams/${getTeamImageUrl(id)}`} alt={`${name} Logo`} />
        </figure>
      </div>
    </Link>
  );
};

const getTeamImageUrl = id => {
  const team = TeamsApi.find(team => team.id === id);
  return team.imageUrl;
};
