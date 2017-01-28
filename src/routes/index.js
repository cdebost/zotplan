'use strict'

import api from './api'
import express from 'express'
import path from 'path'

export default ({app, config}) => {
    app.use('/api', api({config}))
    app.use(express.static(path.join(__dirname, '../../public')))
}

