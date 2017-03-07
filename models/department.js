'use strict';

const Mongoose = require('mongoose');

const departmentSchema = new Mongoose.Schema({
    _id: String,
    courses: [{ type: String, ref: 'Course' }]
});

module.exports = Mongoose.model('Department', departmentSchema);
