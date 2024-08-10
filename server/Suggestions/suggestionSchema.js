const mongoose = require('mongoose');

const sugSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    supporterId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'supporters'
    },
    issueId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'issues'
    },
    sug1: {
        type: Boolean,
        default: false,
    },
    sug2: {
        type: Boolean,
        default: false,
    },
    sug3: {
        type: Boolean,
        default: false,
    },
    action: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true }
)

module.exports = mongoose.model('suggestions', sugSchema);
