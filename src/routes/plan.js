'use strict';

import express from 'express';

import Plan from '../models/plan.js';
import User from '../models/user.js';

export default () => {
    const router = express.Router();

    router.get('/:id', async function (req, res) {
        try {
            res.send(await Plan.findById(req.params.id))
        } catch (err) {
            res.sendStatus(404);
        }
    });

    router.post('/', async function (req, res)  {
        try {
            const plan = await Plan.create({
                name: req.body.name, startYear: req.body.startYear
            });
            await User.update({ _id: req.session.userId }, { $push: { plans: plan._id } });
            res.send(plan);
        } catch (err) {
            res.sendStatus(400);
        }
    });

    return router;
};
