const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name.']
    },
    studentId: {
        type: Number,
        required: [true, 'Please enter your Student ID number.'],
        unique: [true, 'This student number is already in use.']
    },
    instrument: {
        type: []
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Student', studentSchema);