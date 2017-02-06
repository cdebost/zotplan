'use strict'

import express from 'express'

import Plan from '../../models/plan.js'

export default () => {
    const router = express.Router()

    router.get('/:id', (req, res) => {
        Plan.findById(req.params.id)
            .then(plan => {
                res.send(plan)
            })
    })

    router.post('/', (req, res) => {
        Plan.create({
                name: req.body.name,
                startYear: req.body.startYear,
                userId: req.session.userId
            })
            .then(plan => {
                res.send(plan)
            }, err => {
                res.sendStatus(400)
            })
    })

    return router
}
