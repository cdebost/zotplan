import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { amber700, blue500, darkBlack } from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';

import routes from './routes';
import * as reducers from './reducers';
import saga from './sagas';

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer,
});

const sagaMiddleware = createSagaMiddleware();
const myRouterMiddleware = routerMiddleware(browserHistory);

const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware, myRouterMiddleware),
);

sagaMiddleware.run(saga);

const history = syncHistoryWithStore(browserHistory, store);

injectTapEventPlugin();
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: 'var(--uci-yellow)',
    primary2Color: amber700,
    accent1Color: blue500,
    textColor: darkBlack,
    alternateTextColor: darkBlack,
  },
});

render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Router routes={routes(store)} history={history} />
    </MuiThemeProvider>
  </Provider>,
    document.getElementById('react-entry'),
);
