import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App, Home, NotFound, Onboarding, Plan } from './containers';
import { fetchOwnUser } from './actions';

export default (store) => {
    const requireLogin = (nextState, replace, cb) => {
        const { user } = store.getState().user;
        if (user) return cb();
        store.dispatch(fetchOwnUser());
        const unsubscribe = store.subscribe(() => {
            const state = store.getState();
            if (!state.user.isSignInPending) {
                unsubscribe();
                if (!state.user.user) replace('/login');
                cb();
            }
        });
    };

    return (
        <Route path="/">
            <Route path="login" component={Onboarding} />

            <Route onEnter={requireLogin} component={App}>
                <IndexRoute component={Home}/>
                <Route path="user/:userId/plan/:planId" component={Plan} />

                <Route path="*" component={NotFound} status={404}/>
            </Route>
        </Route>
    );
}