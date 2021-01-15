const mongoose = require('mongoose');
const adminSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  userName: {
      type: String,
      required: true
  },
  email: {
      type: String,
      required: true
  } ,
  password: {
      type: String,
      required: true
  },
  confirmPassword: {
      type: String,
      required: true
  },
  status: {
       type: String,
       default: "admin"
  }
  });

module.exports = mongoose.model("Admin", adminSchema);