'use strict'

import express from 'express'
import http from 'http'
import Mongoose from 'mongoose'
import 'babel-polyfill';

import routes from './routes'

let app;

export { app };

export default config => {
    app = express()
    app.server = http.createServer(app)

    Mongoose.Promise = global.Promise;
    Mongoose.connect('mongodb://localhost/zotplan_' + config.environment);

    routes({app, config})

    app.server.listen(config.port || 8000)

    return app
}

