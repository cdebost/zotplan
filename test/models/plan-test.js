import Plan from '../../src/models/plan'
import { expect } from 'chai'
import { _db } from '../../src/app'

describe('Plan', () => {
    it('can be found by id', done => {
        Plan.findById(0)
            .then(plan => {
                done()
                expect(plan.id).to.equal(0)
            }, err => done(err))
    })

    it('throws a RangeError when a find fails', done => {
        Plan.findById(-1)
            .then(plan => {
                done('Should throw a RangeError')
            }, err => done())
    })

    it('loads its courses into an array and sorts courses by their id', done => {
        Plan.findById(0)
            .then(plan => {
                expect(plan.courses[0][0][0].id).to.equal('CS 1')
                expect(plan.courses[0][0][1].id).to.equal('STATS 1')
                done()
            })
            .catch(err => done(err))
    })

    it('can be created', done => {
        Plan.create({
                name: 'My Plan',
                startYear: 2014,
                userId: 'id1'
            })
            .then(plan => {
                expect(plan.name).to.equal("My Plan")
                expect(plan.start_year).to.equal(2014)
                done()
            })
            .catch(done)
    })

    it('inserts a record into the user_has_plan table on creation', done => {
        Plan.create({
                name: 'My Plan',
                startYear: 2014,
                userId: 'id1'
            })
            .then(plan => {
                return _db.query('SELECT plan_id FROM user_has_plan WHERE user_id = $1::VARCHAR(50)',
                        ['id1'])
                    .then(result => {
                        expect(result[result.length-1].plan_id).to.equal(plan.id)
                        done()
                    })
            })
            .catch(done)
    })
})
