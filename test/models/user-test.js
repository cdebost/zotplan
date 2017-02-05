import User from '../../src/models/user'
import { expect } from 'chai'
import { _db } from '../../src/app'

describe('User', () => {
    it('can be found by id', done => {
        User.find('id2')
            .then(user => {
                expect(user.id).to.equal('id2')
                done()
            }, done)
    })

    it('throws a RangeError when a find fails', done => {
        User.find('id4')
            .then(user => {
                done('Should throw a RangeError')
            }, err => done())
    })

    it('can be saved', done => {
        User.find('id2')
            .then(user => {
                user.name = 'A whole new name'
                return user.save()
            })
            .then(user => {
                return _db.query('SELECT name from zotplan_user WHERE id = $1::VARCHAR(50)',
                        ['id2'])
            })
            .then(results => {
                expect(results[0].name).to.equal('A whole new name')
                return _db.query('SELECT name from zotplan_user WHERE id = $1::VARCHAR(50)',
                        ['id1'])
            })
            .then(results => {
                expect(results[0].name).to.equal('First User')
                done()
            })
            .catch(done)
    })

    it('can fetch the user\'s own plans', done => {
        User.find('id1')
            .then(user => {
                return user.getPlans()
            })
            .then(plans => {
                expect(plans.length).to.equal(1)
                done()
            })
            .catch(done)
    })
})
