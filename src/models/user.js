'use strict';

const Mongoose = require('mongoose');

const userSchema = new Mongoose.Schema({
    _id: String,
    accountType: String,
    name: String,
    email: String,
    passwordHash: String,
    created: { type: Date, default: Date.now },
    lastSignin: Date,
    plans: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Plan' }]
});

userSchema.virtual('safeProps')
    .get(function () {
        return { id: this._id, name: this.name, email: this.email };
    });

export default Mongoose.model('User', userSchema);
