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
  
  update: {
    type: String,
    required: true
  },

});

module.exports = mongoose.model('casupdates', caseeSchema);
