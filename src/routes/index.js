'use strict';

import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import session from 'express-session';
import React from 'react';
import { createStore } from 'redux';
import { Router, Route, RoutingContext, match } from 'react-router';
import { renderToString } from 'react-dom/server';
import { createLocation } from 'history/LocationUtils.js';

import auth from './auth.js';
import courses from './courses';
import user from './user';
import {
    App, NotFound
} from '../containers';

export default ({app, config}) => {
    app.use(bodyParser.json())
    app.use(session({
        secret: 'replace-this-secret-later',
        resave: true,
        saveUninitialized: true
    }))

    //app.use(express.static(path.join(__dirname, '../../public')))

    app.use('/auth', auth({config}))

    app.use('/api', (req, res, next) => {
        if (req.session && req.session.userId) {
            return next()
        } else {
            return res.sendStatus(401)
        }
    });

    app.use('/api/courses', courses());
    app.use('/api/user', user());

    // app.get("*", (req, res) => {
    //     res.sendFile(path.resolve(__dirname, '..', '..', 'dist', 'index.html'));
    // });

    const Routes = (props) => {
        <Router {...props}>
            <Route path="/" component={App} />
            <Route path="*" component={NotFound} />
        </Router>
    }

    const routes = (
        <Route name="app" component={App} path="/"></Route>
    );

    app.use((req, res) => {
        const location = createLocation(req.url);
        match({ routes, location }, (err, redirectLocation, renderProps) => {
            if (err) return res.sendStatus(500);
            if (!renderProps) return res.sendStatus(404);

            const initialComponent = <RoutingContext {...renderProps} />;
            console.log(App);
            const componentHTML = renderToString(initialComponent);
            const HTML = `
            <!DOCTYPE html>
            <html>
                <head>
                <meta charset="utf-8">
                <title>Isomorphic Redux Demo</title>
                </head>
                <body>
                <div id="react-view">${componentHtml}</div>
                <script type="application/javascript" src="/bundle.js"></script>
                </body>
            </html>
            `;
            res.send(HTML);
        });

        // ReactDOM.render(
        //     <Routes history={browserHistory} />,
        //     document.getElementById('root')
        // );
    });
}