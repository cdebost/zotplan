import { expect } from 'chai';
import { describeApiTest } from './utils';

describeApiTest('user route', (request) => {
  it('responds to /api/user with the user\'s own user information', (done) => {
    request()
      .get('/api/user')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body._id).to.equal('id1');
        expect(res.body.password).to.equal(undefined);
        done();
      });
  });

  it('responds to /api/user/:id where id is the user\'s own id', (done) => {
    request()
      .get('/api/user/id1')
      .expect(200, done);
  });

  it('never sends sensitive user information', (done) => {
    request()
      .get('/api/user/id1')
      .expect(200)
      .end((err, res) => {
        expect(res.body.password_hash).to.equal(undefined);
        done(err);
      });
  });

  it('responds with 401 when the user id is not the currently signed in user\'s id', (done) => {
    request()
      .get('/api/user/id2')
      .expect(401, done);
  });

  it('can sign out', (done) => {
    request()
      .delete('/api/auth')
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        request()
          .get('/api/user')
          .expect(401, done);
      });
  });

  describe('plans', () => {
    it('can POST to /api/user/:id/plan to create a new plan', (done) => {
      request()
        .post('/api/user/id1/plan')
        .send({ name: 'A new plan', startYear: 2010 })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body._id).to.not.be.undefined;
          expect(res.body.name).to.equal('A new plan');
          expect(res.body.startYear).to.equal(2010);
          done();
        });
    });

    it('prevents creating a second plan with the same name for a single user', (done) => {
      request()
        .post('/api/user/id1/plan')
        .send({ name: 'A new plan', startYear: 2015 })
        .end((err) => {
          if (err) return done(err);
          request()
            .post('/api/user/id1/plan')
            .send({ name: 'A new plan', startYear: 2015 })
            .expect(400, done);
        });
    });

    it('prevents creating more than 5 plans for one user', (done) => {
      let successfulRequests = 0;
      const requestCb = (err) => {
        if (err) return done(err);
        successfulRequests++;
        if (successfulRequests >= 5) {
          request()
            .post('/api/user/id1/plan')
            .send({ name: 'Plan 5', startYear: 2010 })
            .expect(400, done);
        }
      };
      for (let i = 0; i < 5; i++) {
        request()
          .post('/api/user/id1/plan')
          .send({ name: `Plan ${i}`, startYear: 2010 })
          .expect(200, requestCb);
      }
    });

    it('initializes plans with an empty course collection of four years', (done) => {
      request()
        .post('/api/user/id1/plan')
        .send({ name: 'Initialized Plan', startYear: 2010 })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.years.length).to.equal(4);
          expect(res.body.years[0].quarters.length).to.equal(3);
          expect(res.body.years[0].quarters[0].courses.length).to.equal(0);
          done();
        });
    });

    it('can delete plans', (done) => {
      request()
        .post('/api/user/id1/plan')
        .send({ name: 'A New Plan', startYear: 2010 })
        .expect(200)
        .end((postErr, res) => {
          if (postErr) return done(postErr);
          const { _id } = res.body;
          request()
            .delete(`/api/user/id1/plan/${_id}`)
            .expect(200)
            .end((deleteErr) => {
              if (deleteErr) return done(deleteErr);
              request()
                .get('/api/user/id1')
                .end((err, userRes) => {
                  if (err) return done(err);
                  expect(userRes.body.plans.length).to.equal(1);
                  done();
                });
            });
        });
    });

    it('returns a 400 when deleting a plan that doesn\'t exist', (done) => {
      request()
        .delete('/api/user/id1/plan/ANonExistingPlanId')
        .expect(400, done);
    });
  });
});
