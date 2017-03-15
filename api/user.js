import express from 'express';
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
