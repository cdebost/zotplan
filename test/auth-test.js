import App from '../src/app'
import request from 'supertest'
import { expect } from 'chai'

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

    describe('zotplan', () => {
        it('accepts valid credentials', done => {
            request(app)
                .post('/auth/zotplan')
                .send({ email: 'first@zotplan.com', password: 'password' })
                .expect(200, done)
        })

        it('denies an invalid email', done => {
            request(app)
                .post('/auth/zotplan')
                .send({ email: 'nonexistent@zotplan.com', password: 'password' })
                .expect(400)
                .end((err, res) => {
                    expect(res.body.error).to.equal('Invalid email')
                    done(err)
                })
        })

        it('denies for an email that exists but only in a non-zotplan account', done => {
            request(app)
                .post('/auth/zotplan')
                .send({ email: 'first@google.com', password: 'password' })
                .expect(400)
                .end((err, res) => {
                    expect(res.body.error).to.equal('Invalid email')
                    done(err)
                })
        })

        it('denies an invalid password', done => {
            request(app)
                .post('/auth/zotplan')
                .send({ email: 'first@zotplan.com', password: 'wrong_password' })
                .expect(400)
                .end((err, res) => {
                    expect(res.body.error).to.equal('Invalid password')
                    done(err)
                })
        })
    })

    describe('google', () => {
        it('accepts valid tokens', done => {
            request(app)
                .post('/auth/google')
                .send({ token: 'test token' })
                .expect(200, done)
        })

        it('denies invalid tokens', done => {
            request(app)
                .post('/auth/google')
                .send({ token: 'invalid token' })
                .expect(400, done)
        })
    })
})
