const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    userId: String,
    pickup: String,
    destination: String,
    recName: String,
    recPhoneNo: Number,
    userPhoneNo: Number,
    currentLocation: String
});

module.exports = mongoose.model('Order', orderSchema);