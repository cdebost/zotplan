'use strict'

import express from 'express'

import Course from '../../models/course.js'

export default () => {
    const router = express.Router()

    router.get('/', (req, res) => {
        Course.all()
            .then(result => {
                res.send(result)
            }, err => {
                console.error(err)
                res.status(500)
            })
    })

    return router
}

