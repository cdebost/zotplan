'use strict'

import request from 'supertest'

describe('courses', () => {
    let server;
    beforeEach(() => {
        server = require('../src')
    })

    it('responds to /api/courses with all the courses', done => {
        request(server)
            .get('/api/courses')
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (!err) {
                    if (res.body.length !== 10) {
                        err = new Error('Expected to see 10 courses, got ' + res.body.length)
                    }
                }
                done(err)
            })
    })
})
        
