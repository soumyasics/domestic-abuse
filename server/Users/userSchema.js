const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  contact: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
 
  dob: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  relation: {
    type: String,
    required: true
  },
  aadhar: {
    type: String,
    required: true
  },
  image: {
    type: Object, 
    default: null
  },
  isActive:{
    type:Boolean,
    default:true
  }
});

module.exports = mongoose.model('users', userSchema);
