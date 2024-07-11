const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    userId:{
type:mongoose.Schema.Types.ObjectId,
required:true,
ref:'users'
    },
  type: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  file: {
    type: Object,
    default: null
  },
  dateTime: {
    type: Date,
 default:new Date()
  },
  contact: {
    type: Number,
    required: true
  },
  suppStatus:{
    type:Boolean,
    default:false
  }
});

module.exports = mongoose.model('issues', issueSchema);
