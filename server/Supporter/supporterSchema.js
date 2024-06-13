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
    organization: {
        type: String,
        default:'Nill'
      
    },
    image: {
        type: Object,
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
});

module.exports = mongoose.model('supporters', schema)

