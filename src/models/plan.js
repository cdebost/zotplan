'use strict';

const Mongoose = require('mongoose');

const planSchema = new Mongoose.Schema({
    name: String,
    startYear: Number,
    courses: [{ type: String, ref: 'Course' }]
});

export default Mongoose.model('Plan', planSchema);
