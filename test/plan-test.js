import { describeApiTest } from './utils'
import { expect } from 'chai'

describeApiTest('plan route', request => {
    it('responds to /api/plan/:id where the plan id is valid', done => {
        request()
            .get('/api/plan/0')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body.name).to.equal('Main Plan')
                done()
            })
    })
})
