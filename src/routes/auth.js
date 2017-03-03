'use strict';

import bcrypt from 'bcrypt';
import express from 'express';
import session from 'express-session';

import User from '../models/user';

export default ({config}) => {
    const router = express.Router();

    router.post('/zotplan', (req, res) => {
        if (!req.body) return res.sendStatus(400);
        const email = req.body.email;
        const rawPassword = req.body.password;

        return User.findOne({ email, accountType: 'zotplan' })
            .then(user => {
                if (!user) {
                    throw new Error('Invalid email');
                }
                return bcrypt.compare(rawPassword, user.passwordHash)
                    .then(isValidPassword => {
                        if (!isValidPassword) {
                            throw new Error('Invalid password');
                        }
                        req.session.userId = user.id;
                        res.send(user.safeProps);
                    });
            })
            .catch(err => {
                res.status(400).send({
                    error: err.message
                });
            });
    });

    router.post('/google', (req, res) => {
        if (!req.body) return res.sendStatus(400);
        const token = req.body.token;
        config.googleClient.verifyIdToken(token, config.googleClientId, (err, login) => {
            if (err) return res.sendStatus(400);

            const payload = login.getPayload();
            const id = 'go_' + payload['sub'];

            User.findById(id).exec()
                .then(user => {
                    if (user) return user;
                    return User.create({
                        _id: id,
                        accountType: 'google',
                        name: payload.name
                    });
                })
                .then(user => {
                    req.session.userId = user._id;
                    res.send(user.safeProps);
                });
        });
    });

    return router;
};
