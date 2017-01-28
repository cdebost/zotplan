import Model from './model'

export default class User extends Model {

    createSessionKey() {
        return 'fake'
    }

    save() {
        return Model.db.query('UPDATE zotplan_user SET ' +
                'name = $1::VARCHAR(80), email = $2::VARCHAR(150)',
                [this.name, this.email])
            .then(() => this)
    }

    static find(id) {
        const self = this
        return (id ? Promise.resolve() : Promise.reject(new Error('No ID specified')))
            .then(() => {
                return self.db.query('SELECT * FROM zotplan_user WHERE id = $1::VARCHAR(50)', [id])
            })
            .then(result => {
                if (result.length === 0) {
                    throw new RangeError('No record found')
                }
                return new User(result[0])
            })
    }
}

