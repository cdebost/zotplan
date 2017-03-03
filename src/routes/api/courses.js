'use strict';

import express from 'express';

import Course from '../../models/course.js';

export default () => {
    const router = express.Router();

    // TODO: Sends lots of data, maybe narrow down to department?
    router.get('/', (req, res) => {
        Course.find()
            .then(result => {
                res.send(result);
            });
    });

    router.get('/:id', (req, res) => {
        Course.findById(req.params.id)
            .then(result => {
                res.send(result);
            }, err => {
                res.sendStatus(404);
            });
    });

    return router;
};
