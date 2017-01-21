'use strict'

import express from 'express'

export default ({db}) => {
    const router = express.Router()

    router.get('/', (req, res) => {
        db.connect((err, client, done) => {
            if (err) {
                console.error(err)
                res.sendStatus(405)
            }
            client.query('SELECT * from course', (err, result) => {
                done()

                if (err) {
                    console.error(err)
                    res.sendStatus(405)
                }

                res.json(result.rows)
            })
        })
    })

    return router
}

