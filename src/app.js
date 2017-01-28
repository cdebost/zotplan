'use strict'

import express from 'express'
import http from 'http'

import DB from './db'
import models from './models'
import routes from './routes'

let app
let db

export { app, db as _db }

export default config => {
    app = express()
    app.server = http.createServer(app)

    const dbConf = {
        database: 'zotplan_' + config.environment,
        host: '/var/run/postgresql',
        max: 10,
        idleTimeoutMillis: 30000
    }
    db = new DB(dbConf)

    models({db})
    routes({app, config})

    app.server.listen(config.port || 8000)

    return app
}

