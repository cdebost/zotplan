'use strict'

import request from 'supertest'
import App from '../src/app'

describe('routing', () => {
    let app
    beforeEach(() => {
        app = App({
            environment: 'test'
        })
    })

    afterEach(() => {
        app.server.close()
    })

    it('responds to / with the public index.html', done => {
        request(app)
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
        request(app)
            .get('/favicon.ico')
            .expect(200, done)
    })

    it('responds to /api', done => {
        request(app)
            .get('/api')
            .expect(200, done)
    })

    it('404s any invalid routes', done => {
        request(app)
            .get('/courses')
            .expect(404, done)
    })
})

