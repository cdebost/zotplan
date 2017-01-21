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
            .end((err, res) => {
                done(err)
            })
    })
})
        
