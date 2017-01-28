'use strict'

import express from 'express'
import http from 'http'

import DB from './db'
import models from './models'
import routes from './routes'

const app = express()
app.server = http.createServer(app)

if (!process.env.ENVIRONMENT) {
    process.env.ENVIRONMENT = 'staging'
}

const dbConf = {
    database: 'zotplan_' + process.env.ENVIRONMENT,
    host: '/var/run/postgresql',
    max: 10,
    idleTimeoutMillis: 30000
}

const db = new DB(dbConf)
models({db})
routes({app})

app.server.listen(process.env.PORT || 8000)
console.log(`Server running on ${app.server.address().port}`)

export default app

// For testing purposes only
export const _db = db

if (typeof module !== 'undefined') {
    module.exports = app
    module.exports._db = db
}

