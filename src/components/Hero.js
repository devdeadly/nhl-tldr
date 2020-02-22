import React from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun } from 'react-feather';

export default ({ theme, toggleUi }) => (
  <section className="hero">
    <div className="hero-body" style={{ padding: 'none' }}>
      <div className="flex-container">
        <Link to="/">
          <h1 className="title">nhl digest</h1>
        </Link>
        <label className="d-flex">
          {theme === 'dark' ? (
            <Sun
              onClick={toggleUi}
              color="#eae2e2"
              style={{ cursor: 'pointer' }}
            />
          ) : (
            <Moon
              onClick={toggleUi}
              color="#363636"
              style={{ cursor: 'pointer' }}
            />
          )}
        </label>
      </div>
    </div>
  </section>
);
