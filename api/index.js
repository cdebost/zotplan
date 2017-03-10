'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import auth from './auth.js';
import courses from './courses.js';
import user from './user.js';

export default ({ googleAuthClient }) => {
    const router = express.Router();

    router.use((req, res, next) => {
        // Allow connections from the webpack dev server
        res.header("Access-Control-Allow-Origin", "http://localhost:8080");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    router.use(bodyParser.json());
    router.use(session({
        secret: 'replace-this-secret-later',
        resave: true,
        saveUninitialized: true
    }));

    router.use('/auth', auth({ googleAuthClient }));

    router.use((req, res, next) => {
        if (req.session && req.session.userId) {
            return next();
        } else {
            return res.sendStatus(401);
        }
    });

    router.use('/courses', courses());
    router.use('/user', user());

    router.use('*', (req, res) => {
        res.sendStatus(404);
    });

    return router;
}