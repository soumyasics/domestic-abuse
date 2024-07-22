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
 
  caseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cases'
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
    default:'pending'
  },
  payment: {
    type: Number,
    required: true
  },

});

module.exports = mongoose.model('payments', caseeSchema);
