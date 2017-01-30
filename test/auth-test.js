import { expect } from 'chai'
import { describeApiTest } from './utils'

describeApiTest('auth', request => {
    it('denies access to protected resources while unauthorized', done => {
        request()
            .get('/api')
            .expect(401, done)
    })

    describe('zotplan', () => {
        it('accepts valid credentials', done => {
            request()
                .post('/auth/zotplan')
                .send({ email: 'first@zotplan.com', password: 'password' })
                .expect(200, done)
        })

        it('denies an invalid email', done => {
            request()
                .post('/auth/zotplan')
                .send({ email: 'nonexistent@zotplan.com', password: 'password' })
                .expect(400)
                .end((err, res) => {
                    expect(res.body.error).to.equal('Invalid email')
                    done(err)
                })
        })

        it('denies for an email that exists but only in a non-zotplan account', done => {
            request()
                .post('/auth/zotplan')
                .send({ email: 'first@google.com', password: 'password' })
                .expect(400)
                .end((err, res) => {
                    expect(res.body.error).to.equal('Invalid email')
                    done(err)
                })
        })

        it('denies an invalid password', done => {
            request()
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
            request()
                .post('/auth/google')
                .send({ token: 'test token' })
                .expect(200, done)
        })

        it('denies invalid tokens', done => {
            request()
                .post('/auth/google')
                .send({ token: 'invalid token' })
                .expect(400, done)
        })
    })
}, false)
