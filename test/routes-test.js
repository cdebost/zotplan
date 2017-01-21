'use strict'

import request from 'supertest'

describe('routing', () => {
    let server
    beforeEach(() => {
        server = require('../src')
    })

    it('responds to / with the public index.html', done => {
        request(server)
            .get('/')
            .expect(200)
            .expect('Content-Type', 'text/html; charset=UTF-8')
            .end((err, res) => {
                if (!err && !res.text.includes('ZotPlan')) {
                    err = new Error('/ did not return the index.html')
                }
                done(err)
            })
    })

    it('responds for public files', done => {
        request(server)
            .get('/placeholder.json')
            .expect(200, done)
    })

    it('responds to /api', done => {
        request(server)
            .get('/api')
            .expect(200, done)
    })

    it('404s any invalid routes', done => {
        request(server)
            .get('/courses')
            .expect(404, done)
    })
})

