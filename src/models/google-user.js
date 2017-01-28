import User from './user'

export default class GoogleUser extends User {
    
    static find(id, data) {
        const self = this
        if (!data.name) return Promise.reject(new Error('No name specified'))

        if (!id.startsWith('go_')) {
            id =  'go_' + id
        }

        return User.find(id)
            .then(user => {
                user.name = data.name
                user.email = data.email
                return user.save()
            }, err => {
                if (err.name !== 'RangeError') {
                    throw err
                }
                return self.db.query('INSERT INTO zotplan_user VALUES (' +
                    "$1::VARCHAR(50), 'google', $2::VARCHAR(80), NULL, NULL, CURRENT_TIMESTAMP)",
                    [id, data.name]
                ).then(() => {
                    return User.find(id)
                })
            })
    }
}

