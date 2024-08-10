const mongoose = require('mongoose');

const caseeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  },
  houseId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'safehouses'
  },
  date: {
    type: Date,
    required: true
  },
  suppId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'supporters',
    required: true,
  },
  status:{
    type:String,
    default:'pending'
  },
  issueId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'issues'
  },
},{timestamps:true});

module.exports = mongoose.model('houserequests', caseeSchema);
