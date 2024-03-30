const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    hashed_password: { type: String, required: true },
    salt: { type: String, required: true }
  });

module.exports = mongoose.model('User', UserSchema)