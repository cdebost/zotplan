'use strict'

import { describeApiTest } from './utils'

describeApiTest('courses', request => {
    it('responds to /api/courses with all the courses', done => {
        request()
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

    it('responds to /api/courses/:id with a specific course', done => {
        request()
            .get('/api/courses/CS%201')
            .expect(200)
            .expect('Content-Type', /json/, done)
    })

    it('404s an invalid course id', done => {
        request()
            .get('/api/course/someInvalidId')
            .expect(404, done)
    })
})

