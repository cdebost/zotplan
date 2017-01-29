'use strict'

import express from 'express'

import courses from './courses'

export default ({config}) => {
    const router = express.Router()

    router.get('/', (req, res) => {
        res.send('Hello api!')
    })

    router.use('/courses', courses())

    return router
}

