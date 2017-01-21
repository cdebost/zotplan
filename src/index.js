'use strict'

import express from 'express'
import http from 'http'
import pg from 'pg'

import routes from './routes'

let app = express()
app.server = http.createServer(app)

const dbConf = {
    database: process.env.ENVIRONMENT === 'production' ? 'zotplan' : 'zotplantest',
    host: '/var/run/postgresql',
    max: 10,
    idleTimeoutMillis: 30000
}
const db = new pg.Pool(dbConf)

routes({app, db})

app.server.listen(process.env.PORT || 8000)
console.log(`Server running on ${app.server.address().port}`)

export default app
if (typeof module !== 'undefined') {
    module.exports = app
}

