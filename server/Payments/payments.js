const mongoose = require('mongoose');

const caseeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  },
  appId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'lprequests'
  },
  date: {
    type: Date,
    required: true
  },
  lpId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'legalprofessionals'
  },
  paymentStatus:{
    type:String,
    default:'Requested'
  },
  payment: {
    type: Number,
    required: true
  },
  category:{
    type:String,
  },
},{timestamps:true});

module.exports = mongoose.model('payments', caseeSchema);
