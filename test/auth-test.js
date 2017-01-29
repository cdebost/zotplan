import App from '../src/app'
import request from 'supertest'

describe('auth', () => {
    let app
    beforeEach(() => {
        app = new App({
            environment: 'test',
            googleClient: {
                verifyIdToken: (token, clientId, cb) => {
                    if (token === 'test token') {
                        cb(null, {
                            getPayload: () => {
                                return {
                                    sub: 'id1',
                                    name: 'Google User',
                                    email: 'user@google.com'
                                }
                            }
                        })
                    } else {
                        cb(new Error("Invalid token"))
                    }
                }
            }
        })
    })

    afterEach(() => {
        app.server.close()
    })

    it('responds to /api/auth/google and accepts valid tokens', done => {
        request(app)
            .post('/api/auth/google')
            .send({ token: 'test token' })
            .expect(200, done)
    })

    it('denies invalid tokens', done => {
        request(app)
            .post('/api/auth/google')
            .send({ token: 'invalid token' })
            .expect(400, done)
    })
})
