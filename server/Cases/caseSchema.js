const mongoose = require('mongoose');

const caseeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  },
  issueId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  },
  status: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  
 
  date: {
    type: Date,
    required: true
  },
  lpId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'legalprofessionals'
  },
  lpStatus:{
    type:Boolean,
    default:false
  }

});

module.exports = mongoose.model('cases', caseeSchema);
