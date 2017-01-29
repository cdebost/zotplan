'use strict'

import express from 'express'
import session from 'express-session'

import GoogleUser from '../../models/google-user'

export default ({config}) => {
    const router = express.Router()

    router.post('/google', (req, res) => {
        const token = req.body && req.body.token
        if (!token) {
            return res.sendStatus(400)
        }
        config.googleClient.verifyIdToken(token, config.googleClientId, (err, login) => {
            if (err) return res.sendStatus(400)
            const payload = login.getPayload()
            GoogleUser.find('go_' + payload['sub'], payload)
                .then(user => {
                    req.session.userId = user.id
                })
                .then(key => {
                    res.sendStatus(200)
                })
                .catch(err => {
                    console.error(err)
                    res.sendStatus(400)
                })
        });
    })

    return router
}
    
