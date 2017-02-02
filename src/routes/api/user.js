'use strict'

import express from 'express'

import User from '../../models/user.js'

export default () => {
    const router = express.Router()

    router.get('/', (req, res) => {
        User.find(req.session.userId)
            .then(user => {
                res.send(user.safeProps)
            })
    })

    router.get('/:userId', (req, res) => {
        if (req.session.userId !== req.params.userId) {
            res.sendStatus(401)
        } else {
            User.find(req.params.userId)
                .then(user => {
                    res.send(user.safeProps)
                })
        }
    })

    return router
}
