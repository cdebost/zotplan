'use strict';

import express from 'express';

import User from '../models/user.js';

export default () => {
    const router = express.Router();

    router.get('/', async function (req, res) {
        res.send((await User.findById(req.session.userId)).safeProps);
    });

    router.get('/:userId', async function (req, res) {
        if (req.session.userId !== req.params.userId) {
            res.sendStatus(401);
        } else {
            try {
                res.send((await User.findById(req.params.userId)).safeProps);
            } catch (err) {
                res.sendStatus(404);
            }
        }
    });

    router.get('/:userId/plans', async function (req, res) {
        if (req.session.userId !== req.params.userId) {
            res.sendStatus(401);
        } else {
            try {
                res.send((await User.findById(req.params.userId).populate('plans')).plans);
            } catch (err) {
                res.sendStatus(404);
            }
        }
    });

    return router;
};
