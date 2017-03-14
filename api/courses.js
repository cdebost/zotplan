import express from 'express';
import Course from '../models/course';

export default () => {
  const router = express.Router();

  // TODO: Sends lots of data, maybe narrow down to department?
  router.get('/', async (req, res) => {
    res.send(await Course.find());
  });

  router.get('/:id', async (req, res) => {
    try {
      res.send(await Course.findById(req.params.id));
    } catch (err) {
      res.sendStatus(404);
    }
  });

  return router;
};
