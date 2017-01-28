import User from '../../src/models/user'
import { expect } from 'chai'
import { _db } from '../../src'

describe('User', () => {
    it('can be found by id', done => {
        User.find('id2')
            .then(user => {
                expect(user.id).to.equal('id2')
                done()
            }, err => {
                console.error(err)
                done(err)
            })
    })

    it('throws a RangeError when a find fails', done => {
        User.find('id4')
            .then(user => {
                done('Should throw a RangeError')
            }, err => {
                done()
            })
    })

    it('can be saved', done => {
        User.find('id2')
            .then(user => {
                user.name = 'A whole new name'
                return user.save()
            })
            .then(user => {
                return _db.query('SELECT * from zotplan_user WHERE id = $1::VARCHAR(50)',
                        ['id2'])
            })
            .then(results => {
                expect(results[0].name).to.equal('A whole new name')
                done()
            })
            .catch(done)
    })
})
