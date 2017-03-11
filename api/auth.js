'use strict';

import bcrypt from 'bcrypt';
import express from 'express';
import session from 'express-session';

import User from '../models/user';

export default ({ googleAuthClient }) => {
    const router = express.Router();

    router.post('/zotplan', async function (req, res) {
        if (!req.body) return res.sendStatus(400);
        const email = req.body.email;
        const rawPassword = req.body.password;
        const user = await User.findOne({ email, accountType: 'zotplan' });
        if (!user) {
            return res.status(400).send({ error: 'Invalid email' });
        }
        const isValidPassword = await bcrypt.compare(rawPassword, user.passwordHash);
        if (!isValidPassword) {
            return res.status(400).send({ error: 'Invalid password' });
        }
        req.session.userId = user.id;
        res.redirect('../user');
    });

    async function verifyGoogleIdToken(token) {
        return new Promise((resolve, reject) => {
            googleAuthClient.verifyIdToken(token, googleAuthClient.id, (err, login) =>
                resolve(err ? null : login)
            );
        });
    }

    router.post('/google', async function (req, res) {
        let login;
        if (!req.body || !(login = await verifyGoogleIdToken(req.body.token))) {
            return res.sendStatus(400);
        }

        const payload = login.getPayload();
        const id = 'go_' + payload['sub'];
        const user = await User.findById(id) || await User.create({
            _id: id, accountType: 'google', name: payload.name
        });

        req.session.userId = user._id;
        res.send(user.safeProps);
    });

    return router;
};