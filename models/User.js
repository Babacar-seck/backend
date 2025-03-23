const mongoose = require('mongoose');
const uniqueValidator = reuire('mongoose-unique-validator');


const userSchema = mongoose.Schema({
  email: { type:String, require: true, unique: true },
  password: { type:String, require: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);