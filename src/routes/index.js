'use strict'

import api from './api'
import express from 'express'
import path from 'path'

export default ({app}) => {
    app.use('/api', api())
    app.use(express.static(path.join(__dirname, '../../public')))
}

