import { describeApiTest } from './utils'
import { expect } from 'chai'

describeApiTest('plan route', request => {
    it('responds to /api/plan/:id where the plan id is valid', done => {
        request()
            .get('/api/plan/56cb91bdc3464f14678934ca')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body.name).to.equal('Main Plan')
                done()
            })
    })

    it('can POST to /api/plan to create a new plan', done => {
        request()
            .post('/api/plan')
            .send({ name: "A new plan", startYear: 2010 })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body.name).to.equal("A new plan")
                done()
            })
    })
})
