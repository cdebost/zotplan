'use strict';

import express from 'express';

import Course from '../models/course.js';

export default () => {
    const router = express.Router();

    // TODO: Sends lots of data, maybe narrow down to department?
    router.get('/', async function (req, res) {
        res.send(await Course.find());
    });

    router.get('/:id', async function (req, res) {
        try {
            res.send(await Course.findById(req.params.id));
        } catch (err) {
            res.sendStatus(404);
        }
    });

    return router;
};
