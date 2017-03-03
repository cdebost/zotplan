'use strict';

const Mongoose = require('mongoose');

const planSchema = new Mongoose.Schema({
    name: String,
    startYear: Number,
    courses: [ [ [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Course' }] ] ]
});

export default Mongoose.model('Plan', planSchema);
