import { describeApiTest } from './utils'
import { expect } from 'chai'

describeApiTest('user route', request => {
    it('responds to /api/user with the user\'s own user information', done => {
        request()
            .get('/api/user')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body.id).to.equal('id1')
                done()
            })
    })

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

    describe('creating plans', done => {
        it('can POST to /api/user/:id/plan to create a new plan', done => {
            request()
                .post('/api/user/id1/plan')
                .send({ name: "A new plan", startYear: 2010 })
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err)
                    expect(res.body.name).to.equal("A new plan")
                    done()
                });
        });

        it('initializes plans with an empty course collection of four years', done => {
            request()
                .post('/api/user/id1/plan')
                .send({ name: "Initialized Plan", startYear: 2010 })
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body.years.length).to.equal(4);
                    expect(res.body.years[0].quarters.length).to.equal(3);
                    expect(res.body.years[0].quarters[0].courses.length).to.equal(0);
                    done();
                });
        });
    });
})
