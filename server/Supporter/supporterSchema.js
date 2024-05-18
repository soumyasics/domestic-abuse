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
    gender: {
        type: String,
        required: true
    },
    image: {
        type: Object,
        required: true

    },
    isActive:{
        type: String,
     default:'pending'
    }
});

module.exports = mongoose.model('supporters', schema)

