import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import routes from './routes.jsx';
import * as reducers from './reducers';

const reducer = combineReducers({
    ...reducers,
    routing: routerReducer
});

const store = createStore(reducer);
const history = syncHistoryWithStore(browserHistory, store);

render(
    <Provider store={store}>
        <Router routes={routes} history={history}/>
    </Provider>,
    document.getElementById('react-entry')
);