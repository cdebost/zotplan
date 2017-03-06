'use strict';

import express from 'express';

import User from '../models/user.js';

export default () => {
    const router = express.Router();

    router.get('/', async function (req, res) {
        const user = await User.findById(req.session.userId).populate('plans.years.quarters.courses');
        res.send(user.safeProps);
    });

    router.get('/:userId', async function (req, res) {
        if (req.session.userId !== req.params.userId) return res.sendStatus(401);
        try {
            const user = await User.findById(req.session.userId).populate('plans.years.quarters.courses');
            res.send(user.safeProps);
        } catch (err) {
            res.sendStatus(404);
        }
    });

    router.post('/:userId/plan', async function (req, res)  {
        try {
            const years = [];
            for (let i = 0; i < 4; i++) {
                const quarters = [];
                for (let j = 0; j < 3; j++) {
                    quarters.push({ courses: [] });
                }
                years.push({ quarters });
            }
            const plan = { name: req.body.name, startYear: req.body.startYear, years };
            await User.update({ _id: req.session.userId }, { $push: { plans: plan } });
            res.send(plan);
        } catch (err) {
            res.sendStatus(400);
        }
    });

    return router;
};
