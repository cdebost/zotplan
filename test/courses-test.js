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
})
        
