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

  it('can POST to /api/user/:id/plan to create a new plan', (done) => {
    request()
      .post('/api/user/id1/plan')
      .send({ name: 'A new plan', startYear: 2010 })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.name).to.equal('A new plan');
        done();
      });
  });
});
