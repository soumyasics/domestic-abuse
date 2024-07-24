const mongoose = require('mongoose');

const caseeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  },
  issueId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'issues'
  },
 
  
  date: {
    type: Date,
    required: true
  },
  cId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'counsellors'
  },
 status:{
    type:String,
    default:'pending'
  }

});

module.exports = mongoose.model('councillorrequests', caseeSchema);
