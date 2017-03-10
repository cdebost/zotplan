import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App, Home, NotFound, Onboarding } from './containers';
import { fetchOwnUser } from './actions';

export default (store) => {
    const requireLogin = (nextState, replace, cb) => {
        store.dispatch(fetchOwnUser());
        const { user: { user }} = store.getState();
        if (!user) {
            replace('/login');
        }
        cb();
    };

    return (
        <Route path="/">
            <Route path="login" component={Onboarding} />

            <Route onEnter={requireLogin} component={App}>
                <IndexRoute component={Home}/>
            </Route>

            <Route path="*" component={NotFound} status={404}/>
        </Route>
    );
}