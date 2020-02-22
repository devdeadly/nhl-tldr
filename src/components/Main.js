import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomeComponent from './Home';
import PlayerComponent from './Player';
import TeamComponent from './Team';

export default () => (
    <main>
        <Switch>
            <Route exact path="/" component={HomeComponent}/>
            <Route path="/team/:id" component={TeamComponent}/>
            <Route path="/player/:id" component={PlayerComponent}/>
        </Switch>
    </main>
)