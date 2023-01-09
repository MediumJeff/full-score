const mongoose = require('mongoose');
const student = require('./studentModel');

const instrumentSchema = mongoose.Schema({
    type: {
        type: String,
        required: [true, 'Please enter an instrument type']
    },
    make: {
        type: String,
        required: [true, 'Please enter a make or manufacturer name.']
    },
    model: {
        type: String,
    },
    serialNumber: {
        type: String,
        required: [true, 'Please enter a serial number.']
    },
    schoolNumber: {
        type: String
    }, 
    assignedTo: {
        type: [student]
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Instrument', instrumentSchema);