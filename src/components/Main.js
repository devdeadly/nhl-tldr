import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Player from './Player';
import Team from './Team';

export default () => (
    <main>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/team/:id" component={Team}/>
            <Route path="/player/:id" component={Player}/>
        </Switch>
    </main>
)