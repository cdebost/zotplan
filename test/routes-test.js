'use strict'

import { describeApiTest } from './utils'

describeApiTest('routing', request => {
    it('responds to / with the public index.html', done => {
        request()
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
        request()
            .get('/favicon.ico')
            .expect(200, done)
    })

    it('404s any invalid routes', done => {
        request()
            .get('/courses')
            .expect(404, done)
    })
})

