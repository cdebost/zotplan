import Mongoose from 'mongoose';
import request from 'supertest';
import path from 'path';
import { execSync } from 'child_process';
import App from '../../app/app';
import GoogleClientMock from './mocks/google-client-mock';

/* eslint import/prefer-default-export: 0 */
export function describeApiTest(name, tests, shouldSignIn = true) {
  describe(name, () => {
    let app;
    let cookies;

    beforeEach((done) => {
      process.env.NODE_ENV = 'test';
      const collections = ['departments', 'courses', 'users', 'plans'];
      collections.forEach(collec => execSync(
        `mongoimport \
          --db zotplan_test \
          --collection ${collec} \
          --drop \
          --file ${path.join(__dirname, 'datasets', `${collec}.json`)} \
          &> /dev/null`,
      ));
      app = App({
        port: 36456,
        dbName: 'mongodb://localhost/zotplan_test',
        googleAuthClient: new GoogleClientMock(),
      });
      if (!shouldSignIn) {
        done();
      } else {
        request(app)
          .post('/api/auth/zotplan')
          .send({ email: 'first@zotplan.com', password: 'password' })
          .expect(200)
          .end((err, res) => {
            if (err) return done(new Error('Failed to sign in to test account'));
            cookies = res.headers['set-cookie'].pop().split(';').slice(0, 1);
            done();
          });
      }
    });

    afterEach(() => {
      Mongoose.disconnect();
      app.server.close();
      app = null;
      cookies = null;
    });

    function _request() {
      const req = request(app);
      if (!shouldSignIn) {
        return req;
      }
      return {
        get(...args) {
          return req
            .get(...args)
            .set('Cookie', cookies);
        },
        post(...args) {
          return req
            .post(...args)
            .set('Cookie', cookies);
        },
        delete(...args) {
          return req
            .delete(...args)
            .set('Cookie', cookies);
        },
      };
    }

    tests(_request);
  });
}
