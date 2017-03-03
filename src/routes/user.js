'use strict';

import express from 'express';

import User from '../models/user.js';

export default () => {
    const router = express.Router();

    router.get('/', (req, res) => {
        User.findById(req.session.userId)
            .then(user => {
                res.send(user.safeProps);
            });
    });

    router.get('/:userId', (req, res) => {
        if (req.session.userId !== req.params.userId) {
            res.sendStatus(401);
        } else {
            User.findById(req.params.userId)
                .then(user => {
                    res.send(user.safeProps);
                });
        }
    });

    router.get('/:userId/plans', (req, res) => {
        if (req.session.userId !== req.params.userId) {
            res.sendStatus(401);
        } else {
            User.findById(req.params.userId)
                .populate('plans')
                .then(user => {
                    res.send(user.plans);
                });
        }
    });

    return router;
};
