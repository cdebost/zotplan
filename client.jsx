import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

import routes from './routes.jsx';
import * as reducers from './reducers';
import saga from './sagas';

const reducer = combineReducers({
    ...reducers,
    routing: routerReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(saga);

const history = syncHistoryWithStore(browserHistory, store);

render(
    <Provider store={store}>
        <Router routes={routes(store)} history={history}/>
    </Provider>,
    document.getElementById('react-entry')
);