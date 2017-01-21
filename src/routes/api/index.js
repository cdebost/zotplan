'use strict'

import express from 'express'

import courses from './courses'

const router = express.Router()
router.get('/', (req, res) => {
    res.send('Hello api!')
})
router.use('/courses', courses)

export default router
