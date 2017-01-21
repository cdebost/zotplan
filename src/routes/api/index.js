'use strict'

import express from 'express'

import courses from './courses'

export default ({db}) => {
    const router = express.Router()

    router.get('/', (req, res) => {
        res.send('Hello api!')
    })
    router.use('/courses', courses({db}))

    return router
}

