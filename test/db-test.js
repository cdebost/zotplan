'use strict'

import { expect } from 'chai'
import DB from '../src/db'

describe('DB', () => {
    let db
    beforeEach(() => {
        db = new DB({
            database: 'zotplan_test',
            host: '/var/run/postgresql',
            max: 10,
            idleTimeoutMillis: 30000
        })
    })

    describe('query', () => {
        it('can process parameter-less queries', done => {
            db.query('SELECT * FROM course')
                .then(results => {
                    expect(results.length).to.be.greaterThan(0)
                    done()
                })
                .catch(done)
        })

        it('settles into a rejected promise in case of query errors', done => {
            db.query('SELECT * FROM nonexistent_table')
                .then(results => {
                    done("Did not get an error")
                }, err => {
                    done()
                })
        })

        it('can process queries with parameters', done => {
            db.query('SELECT * FROM course WHERE id = $1::TEXT AND units = $2::TEXT',
                    ["EECS 1", "4"])
                .then(results => {
                    expect(results.length).to.equal(1)
                    done()
                }, done)
        })

        it('defends against SQL injection', done => {
            db.query('SELECT * FROM course WHERE id = $1::TEXT', ['"one"; DROP TABLE course; --'])
                .then(results => {
                    expect(results.length).to.equal(0)
                }, err => Function.noop)
                .then(() => {
                    return db.query('SELECT * FROM course')
                })
                .then(results => {
                    expect(results.length).to.equal(10)
                    done()
                }, done)
        })
    })
})

