'use strict'

import express from 'express'

import Course from '../../models/course.js'

export default () => {
    const router = express.Router()

    router.get('/', (req, res) => {
        Course.all()
            .then(result => {
                res.send(result)
            })
    })

    router.get('/:id', (req, res) => {
        Course.findById(req.params.id)
            .then(result => {
                res.send(result)
            }, err => {
                res.sendStatus(404)
            })
    })

    return router
}

