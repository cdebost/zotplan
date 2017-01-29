'use strict'

import express from 'express'

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
                    return user.createSessionKey()
                })
                .then(key => {
                    res.send({ sessionKey: key })
                })
                .catch(err => {
                    console.error(err)
                    res.status(400)
                })
        });
    })

    return router
}
    
