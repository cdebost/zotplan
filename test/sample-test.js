import request from 'supertest'

describe('sample test', () => {
    let server

    beforeEach(() => {
        server = require('../src')
    })

    it('responds to /', done => {
        request(server).get('/').expect(200, done)
    })

    it('404s everything else', done => {
        request(server).get('/foo/bar').expect(404, done)
    })
})

