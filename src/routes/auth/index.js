'use strict'

import bcrypt from 'bcrypt'
import express from 'express'
import session from 'express-session'

import GoogleUser from '../../models/google-user'
import User from '../../models/user'

export default ({config}) => {
    const router = express.Router()

    router.post('/zotplan', (req, res) => {
        if (!req.body) return res.sendStatus(400)
        const email = req.body.email
        const rawPassword = req.body.password

        let user

        return User.searchByEmail(email)
            .then(users => {
                user = users.filter(usr => usr.account_type === 'zotplan')[0]
                if (!user) {
                    throw new Error('Invalid email')
                }
                return bcrypt.compare(rawPassword, user.password_hash)
            })
            .then(isValidPassword => {
                if (!isValidPassword) {
                    throw new Error('Invalid password')
                }
                req.session.userId = user.id
                res.send(user.safeProps)
            })
            .catch(err => {
                res.status(400).send({
                    error: err.message
                })
            })
    })

    router.post('/google', (req, res) => {
        if (!req.body) return res.sendStatus(400)
        const token = req.body.token
        config.googleClient.verifyIdToken(token, config.googleClientId, (err, login) => {
            if (err) return res.sendStatus(400)
            const payload = login.getPayload()
            GoogleUser.find('go_' + payload['sub'], payload)
                .then(user => {
                    req.session.userId = user.id
                    res.send(user.safeProps)
                })
                .catch(err => {
                    console.error(err)
                    res.sendStatus(400)
                })
        })
    })

    return router
}
    
