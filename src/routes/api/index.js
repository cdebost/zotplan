'use strict'

import express from 'express'

import courses from './courses'
import user from './user'

export default ({config}) => {
    const router = express.Router()

    router.get('/', (req, res) => {
        res.send('Hello api!')
    })

    router.use('/courses', courses())
    router.use('/user', user())

    return router
}

