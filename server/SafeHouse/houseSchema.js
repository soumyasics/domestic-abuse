const mongoose = require('mongoose');

const schema = mongoose.Schema({
    supporterId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'supporters'
    },
    name: {
        type: String,

        required: true,

    },

    contact: {
        type: Number,

        required: true,

    },
    landmark: {
        type: String,
        
        required: true,

    },
    description: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    rent: {
        type: Number,
        required: true
    },
    licenseNo: {
        type: String,
        required: true
      
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
},{timestamps:true});

module.exports = mongoose.model('safehouses', schema)

