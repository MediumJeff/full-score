const mongoose = require('mongoose');

// Fix time inputs to take actual time inputs

const calendarSchema = mongoose.Schema({
    eventName: {
        type: String,
        required: [true, 'Please enter a name for this event.']
    },
    eventDate: {
        type: Date,
        required: [true, 'Please enter the date of the event.'],
        min: new Date()
    },
    eventStartTime: {
        type: String
    },
    eventEndTime: {
        type: String
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('Event', calendarSchema);