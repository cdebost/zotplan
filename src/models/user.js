import Model from './model'
import Plan from './plan'

export default class User extends Model {

    get safeProps() {
        return {
            id: this.id,
            name: this.name,
            email: this.email
        }
    }

    save() {
        return Model.db.query('UPDATE zotplan_user SET ' +
                'name = $1::VARCHAR(80), email = $2::VARCHAR(150)' +
                'WHERE id = $3::VARCHAR(50)',
                [this.name, this.email, this.id])
            .then(() => this)
    }

    getPlans() {
        return Model.db.query('SELECT * FROM user_has_plan, plan ' +
                'WHERE user_id = $1::VARCHAR(50) AND plan_id = id',
                [this.id])
            .then(results => {
                return results.map(result => {
                    return new Plan(result)
                })
            })
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

    static searchByEmail(email) {
        const self = this
        return this.db.query('SELECT * FROM zotplan_user WHERE email = $1::VARCHAR(150)', [email])
            .then(results => {
                return results.map(result => new User(result))
            })
    }
}

