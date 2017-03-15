const Mongoose = require('mongoose');

const courseSchema = new Mongoose.Schema({
  _id: String,
  name: String,
  units: Mongoose.Schema.Types.Mixed,
  description: String,
  prerequisite: Mongoose.Schema.Types.Mixed,
  corequisite: Mongoose.Schema.Types.Mixed,
  recommended: Mongoose.Schema.Types.Mixed,
  designUnits: Mongoose.Schema.Types.Mixed,
  restriction: String,
  repeatability: String,
  gradingOption: String,
  overlaps: [{ type: String, ref: 'Course' }],
  concurrent: [{ type: String, ref: 'Course' }],
  quartersOffered: [String],
});

module.exports = Mongoose.model('Course', courseSchema);
