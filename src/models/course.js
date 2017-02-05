import Model from './model.js'

export default class Course extends Model {
    
    static all() {
        return this.db.query('SELECT * FROM course')
            .then(result => {
                return result
            })
    }

    static findById(id) {
        return this.db.query('SELECT * FROM course WHERE id = $1::VARCHAR(15)',
                [id])
            .then(result => {
                if (result.length === 0) {
                    throw new RangeError('No record found')
                }
                return new Course(result[0])
            })
    }
}

