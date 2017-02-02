import { describeApiTest } from './utils'
import { expect } from 'chai'

describeApiTest('user route', request => {
    it('responds to /api/user/:id where id is the user\'s own id', done => {
        request()
            .get('/api/user/id1')
            .expect(200, done)
    })

	it('never sends sensitive user information', done => {
		request()
			.get('/api/user/id1')
			.expect(200)
			.end((err, res) => {
				expect(res.body.password_hash).to.equal(void 0)
				done(err)
			})
	})

	it('responds with 401 when the user id is not the currently signed in user\'s id', done => {
		request()
			.get('/api/user/id2')
			.expect(401, done)
	})
})
