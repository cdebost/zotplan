import App from '../src/app'
import request from 'supertest'
import GoogleClientMock from './mocks/google-client-mock'

export function describeApiTest(name, tests, shouldSignIn = true) {
    describe(name, () => {
        let app
        let cookies

        beforeEach(done => {
            app = new App({
                environment: 'test',
                googleClient: new GoogleClientMock()
            })
            if (!shouldSignIn) {
                done()
            } else {
                request(app)
                    .post('/auth/zotplan')
                    .send({ email: 'first@zotplan.com', password: 'password' })
                    .expect(200)
                    .end((err, res) => {
                        if (err) {
                            return done(new Error('Failed to sign in to test account'))
                        }
                        cookies = res.headers['set-cookie'].pop().split(';').slice(0, 1)
                        done()
                    })
            }
        })

        afterEach(() => {
            app.server.close()
            app = null
            cookies = null
        })

        function _request() {
            const req = request(app)
            if (!shouldSignIn) {
                return req
            }
            return {
                get: function () {
                    return req
                        .get(...arguments)
                        .set('Cookie', cookies)
                },
                post: function () {
                    return req
                        .post(...arguments)
                        .set('Cookie', cookies)
                }
            }
        }

        tests(_request)
    })
}

