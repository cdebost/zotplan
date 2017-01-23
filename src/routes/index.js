'use strict'

import api from './api'
import express from 'express'
import path from 'path'

export default ({app, db}) => {
    app.use('/api', api({db}))
    if (process.env.ENVIRONMENT === "production") {
        app.use(express.static(path.join(__dirname, '../public')))
    } else {
        app.use(express.static(path.join(__dirname, '../../src/public')))
    }
}

