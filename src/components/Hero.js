import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
    <Link to="/">
        <section className="hero is-primary is-bold">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">Hockey App</h1>
                    <h2 className="subtitle">would you please just read the stats?!</h2>
                </div>
            </div>
        </section>
    </Link>
);