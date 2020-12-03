const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema;

module.exports = mongoose.model('User', UserSchema);