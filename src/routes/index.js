'use strict'

import api from './api'
import express from 'express'
import path from 'path'

export default ({app, db}) => {
    app.use('/api', api({db}))
    app.use(express.static(path.join(__dirname, '../public')))
}

