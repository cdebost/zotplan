import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App, Home, NotFound } from './containers';

export default (
    <Route path="/" name="app" component={App}>
        <IndexRoute component={Home}/>

        <Route path="*" component={NotFound} status={404}/>
    </Route>
);