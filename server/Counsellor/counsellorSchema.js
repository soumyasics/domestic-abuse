const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: {
        type: String,

        required: true,

    },

    contact: {
        type: String,

        required: true,

    },
    email: {
        type: String,
        unique: true,
        required: true,

        dropDups: true
    },

    password: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
      
    },
    specialisation: {
        type: String,
        required: true
      
    },
    language: {
        type: String,
        required: true
      
    },
    location: {
        type: String,
        required: true
      
    },
    
    adminApproved:{
        type: Boolean,
        default:false
    
    },
    isActive:{
        type: Boolean,
        default:false
    }
},{timestamps:true});

module.exports = mongoose.model('counsellors', schema)

