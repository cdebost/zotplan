import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import auth from './auth';
import courses from './courses';
import user from './user';

export default ({ googleAuthClient }) => {
  const router = express.Router();

  router.use((req, res, next) => {
    // Allow connections from the webpack dev server
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Cookie');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });

  // Allow all preflighting requests, since cookies aren't sent with OPTIONS
  // they would fail the auth test and get a 401
  router.options('*', (req, res) => {
    res.sendStatus(200);
  });

  router.use(bodyParser.json());
  router.use(session({
    secret: 'replace-this-secret-later',
    cookie: {
      maxAge: 656000000, // two weeks
      sameSite: false,
    },
    resave: true,
    saveUninitialized: true,
  }));

  router.use('/auth', auth({ googleAuthClient }));

  router.use((req, res, next) => {
    if (req.session && req.session.userId) {
      return next();
    }
    return res.sendStatus(401);
  });

  router.use('/courses', courses());
  router.use('/user', user());

  router.use('*', (req, res) => {
    res.sendStatus(404);
  });

  return router;
};
