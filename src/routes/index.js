'use strict'

import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import session from 'express-session'

import auth from './auth.js'
import courses from './courses'
import plan from './plan'
import user from './user'

export default ({app, config}) => {
    app.use(bodyParser.json())
    app.use(session({
        secret: 'replace-this-secret-later',
        resave: true,
        saveUninitialized: true
    }))

    app.use(express.static(path.join(__dirname, '../../public')))

    app.use('/auth', auth({config}))

    app.use('/api', (req, res, next) => {
        if (req.session && req.session.userId) {
            return next()
        } else {
            return res.sendStatus(401)
        }
    });

    app.use('/api/courses', courses());
    app.use('/api/plan', plan());
    app.use('/api/user', user());
}

