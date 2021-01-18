const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    pickup: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    recName: {
        type: String,
        required: true
    },
    recPhoneNo: {
        type: Number,
        required: true
    },
    userPhoneNo: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "ready to pick"
    },
    presentLoc: {
        type: String
    }
});

module.exports = mongoose.model('Order', orderSchema);