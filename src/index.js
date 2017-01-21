'use strict'

import express from 'express'
import http from 'http'

import routes from './routes'

let app = express()
app.server = http.createServer(app)

routes(app)

app.server.listen(process.env.PORT || 8000)
console.log(`Server running on ${app.server.address().port}`)

export default app
if (typeof module !== 'undefined') {
    module.exports = app
}

