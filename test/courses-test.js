'use strict'

import request from 'supertest'
import App from '../src/app'

describe('courses', () => {
    let app
    beforeEach(() => {
        app = App({
            environment: 'test'
        })
    })

    afterEach(() => {
        app.server.close()
    })

    it('responds to /api/courses with all the courses', done => {
        request(app)
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
        
