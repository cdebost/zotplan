const Mongoose = require('mongoose');

const userSchema = new Mongoose.Schema({
  _id: String,
  accountType: String,
  name: String,
  email: String,
  passwordHash: String,
  created: { type: Date, default: Date.now },
  lastSignin: Date,
  plans: [{
    name: String,
    startYear: Number,
    years: [{
      quarters: [{
        courses: [{ type: String, ref: 'Course' }],
      }],
    }],
  }],
});

userSchema.virtual('safeProps')
  .get(function get() {
    return { _id: this._id, name: this.name, email: this.email, plans: this.plans };
  });

export default Mongoose.model('User', userSchema);
