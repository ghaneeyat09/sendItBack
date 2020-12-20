const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String,
    email: String ,
    mobileNo: Number,
    password: String,
    confirmPassword: String
});

module.exports = mongoose.model('User', userSchema);