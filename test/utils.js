import Mongoose from 'mongoose';
import request from 'supertest';
import App from '../app.js';
import GoogleClientMock from './mocks/google-client-mock';

export function describeApiTest(name, tests, shouldSignIn = true) {
    describe(name, () => {
        let app;
        let cookies;

        beforeEach(done => {
            process.env.NODE_ENV = 'test';
            app = App({
                port: 36456,
                dbName: 'mongodb://localhost/zotplan_test',
                googleAuthClient: new GoogleClientMock()
            });
            if (!shouldSignIn) {
                done();
            } else {
                request(app)
                    .post('/api/auth/zotplan')
                    .send({ email: 'first@zotplan.com', password: 'password' })
                    .expect(200)
                    .end((err, res) => {
                        if (err) {
                            return done(new Error('Failed to sign in to test account'));
                        }
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
                get: function () {
                    return req
                        .get(...arguments)
                        .set('Cookie', cookies);
                },
                post: function () {
                    return req
                        .post(...arguments)
                        .set('Cookie', cookies);
                }
            };
        }

        tests(_request);
    });
};
