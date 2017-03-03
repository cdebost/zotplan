'use strict';

import express from 'express';

import Plan from '../../models/plan.js';
import User from '../../models/user.js';

export default () => {
    const router = express.Router();

    router.get('/:id', (req, res) => {
        Plan.findById(req.params.id)
            .then(plan => {
                res.send(plan);
            });
    });

    router.post('/', (req, res) => {
        Plan.create({
                name: req.body.name,
                startYear: req.body.startYear
            })
            .then(plan => {
                return User.update({ _id: req.session.userId }, { $push: { plans: plan._id } })
                    .then(() => res.send(plan));
            })
            .catch(err => {
                res.sendStatus(400);
            })
    });

    return router;
};
