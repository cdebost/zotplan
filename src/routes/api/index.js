'use strict'

import express from 'express'

import auth from './auth'
import courses from './courses'

export default ({config}) => {
    const router = express.Router()

    router.get('/', (req, res) => {
        res.send('Hello api!')
    })

    router.use('/auth', auth({config}))
    router.use('/courses', courses())

    return router
}

