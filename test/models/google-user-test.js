import GoogleUser from '../../src/models/google-user'
import { expect } from 'chai'
import { _db } from '../../src/app'

describe('GoogleUser', () => {
    
    it('finds an existing user and updates its data', done => {
        GoogleUser.find('id1', { name: 'A whole new name', email: null })
            .then(user => {
                return _db.query("SELECT name FROM zotplan_user where id = 'go_id1'")
            })
            .then(results => {
                expect(results[0].name).to.equal('A whole new name')
                done()
            })
            .catch(done)
    })

    it('creates a user if not found', done => {
        GoogleUser.find('id2', { name: 'Second Google User', email: null })
            .then(user => {
                return _db.query("SELECT name FROM zotplan_user where id = 'go_id2'")
            })
            .then(results => {
                expect(results[0].name).to.equal('Second Google User')
                done()
            })
            .catch(done)
    });
})

