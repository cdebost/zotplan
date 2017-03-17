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

  describe('creating plans', () => {
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
        .expect(400, done);
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
  });
});
