import React from 'react';
import { Link } from 'react-router-dom';
import TeamsApi from '../api/teams';

export default ({ id, name, rank, gp, w, l, ot, p, rw, row }) => {
  return (
    <Link to={`/team/${id}`}>
      <div className="mobile-card ">
        <span className="tag is-info">{rank}</span>

        <div>
          <p className="is-5 has-text-weight-bold">{name}</p>
          <nav className="level is-mobile">
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">gp</p>
                <p className="subtitle">{gp}</p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">w</p>
                <p className="subtitle">{w}</p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">l</p>
                <p className="subtitle">{l}</p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">ot</p>
                <p className="subtitle">{ot}</p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">p</p>
                <p className="subtitle">{p}</p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">rw</p>
                <p className="subtitle">{rw}</p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">row</p>
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
