import express from 'express';
import Mongoose from 'mongoose';
import User from '../shared/models/user';

/**
 * The callback called by express when a request to / (i.e. /api/user/) is made. Exporting this
 * so that other routes that need to send back user info (like authentication) can do so without
 * having to duplicate the functionality elsewhere.
 *
 * @async
 * @function
 */
export const userRequestCallback = async (req, res) => {
  if (req.session.userId !== req.params.userId) return res.sendStatus(401);
  try {
    const user = await User.findById(req.session.userId).populate('plans.years.quarters.courses');
    return res.send(user.safeProps);
  } catch (err) {
    return res.sendStatus(404);
  }
};

export default () => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    req.params.userId = req.session.userId;
    await userRequestCallback(req, res);
  });

  router.get('/:userId', async (req, res) => {
    if (req.session.userId !== req.params.userId) return res.sendStatus(401);
    try {
      const user = await User.findById(req.session.userId).populate('plans.years.quarters.courses');
      return res.send(user.safeProps);
    } catch (err) {
      return res.sendStatus(404);
    }
  });

  router.post('/:userId/plan', async (req, res) => {
    const { plans } = await User.findOne({ _id: req.session.userId }, { plans: 1 });
    if (plans.map(plan => plan.name).includes(req.body.name)) {
      res.status(400).send({
        error: 'A plan with that name already exists',
      });
    }
    try {
      const years = [];
      for (let i = 0; i < 4; i++) {
        const quarters = [];
        for (let j = 0; j < 3; j++) {
          quarters.push({ courses: [] });
        }
        years.push({ quarters });
      }
      const plan = {
        _id: Mongoose.Types.ObjectId(),
        name: req.body.name,
        startYear: req.body.startYear,
        years,
      };
      await User.update({ _id: req.session.userId }, { $push: { plans: plan } });
      res.send(plan);
    } catch (err) {
      res.status(400).send({
        error: err,
      });
    }
  });

  return router;
};
