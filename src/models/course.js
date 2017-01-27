import Model from './model.js'

export default class Course extends Model {
    
    static all() {
        return this.db.query('SELECT * FROM course')
            .then(result => {
                return result
            })
    }
}

