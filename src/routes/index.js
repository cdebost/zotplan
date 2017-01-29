'use strict'

import api from './api'
import auth from './auth'
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import session from 'express-session'

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
    }, api({config}))
}

