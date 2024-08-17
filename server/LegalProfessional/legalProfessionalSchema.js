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
    barAssociationId: {
        type: String,
        required: true
      
    },
    firmName: {
        type: String,
        required: true
      
    },
  
    licenseNumber: {
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
    },
    photo: {
        type: Object,
        required: true

    },
    proof: {
        type: Object,
        required: true

    },

},{timestamps:true});

module.exports = mongoose.model('legalprofessionals', schema)

