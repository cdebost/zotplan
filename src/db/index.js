import pg from 'pg'

export default class DB {
    
    constructor(config) {
        this.pool = new pg.Pool(config)
    }

    query(q) {
        let self = this
        return new Promise((resolve, reject) => {
            self.pool.connect((err, client, done) => {
                if (err) return reject(err)
                client.query(q, (err, result) => {
                    done()
                    if (err) return reject(err)
                    resolve(result.rows)
                })
            })
        })
    }
}

