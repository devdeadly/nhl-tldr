import React from 'react';
import { Link } from 'react-router-dom';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';


export default (props) => (
  <section className="hero is-primary is-bold">
    <div className="hero-body">
      <div className="flex-container">
        <Link to="/">
          <h1 className="title">nhl digest</h1>
        </Link>
        <label className="d-flex">
          <Toggle
            defaultChecked={props.isDarkMode}
            icons={{
              checked: <i className="fas fa-moon fa-xs"></i>,
              unchecked: <i className="fas fa-sun fa-xs"></i>,
            }}
            onChange={props.toggleUi} />
        </label>
      </div>
    </div>
  </section>
);