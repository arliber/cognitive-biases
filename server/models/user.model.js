var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: { type: [String] },
  created_at: Date,
  updated_at: Date
})

userSchema.pre('save', function(next) {
  // handle dates
  var currentDate = new Date();
  this.updated_at = currentDate;

  if (!this.created_at) {
    this.created_at = currentDate;
  }

  // handle password
  if (this.isNew) {
    this.password = crypto.createHash('sha256').update(this.password).digest('base64')
  }

  next()
})

userSchema.methods.updatePassword = function (password) {
  this.password = crypto.createHash('sha256').update(password).digest('base64')
}

userSchema.statics.getUserByEmail = function(email) {
  return this.findOne({email}).exec()
}

module.exports = mongoose.model('User', userSchema);
