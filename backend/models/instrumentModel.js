const mongoose = require('mongoose');

const assignmentSchema = mongoose.Schema({
    studentAssigned: {
        type: String,
    },
    dateOut: {
        type: Date,
    },
    dateIn: {
        type: Date,
    }
})

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
        required: [true, 'Please enter a serial number.'],
    },
    schoolNumber: {
        type: String
    }, 
    assignedTo: {
        type: [assignmentSchema],
    },
    damageNotes: {
        type: []
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Instrument', instrumentSchema);