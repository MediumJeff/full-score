const mongoose = require('mongoose');

// Fix time inputs to take actual time inputs
// May be a Front-end alteration for input and keep as String?

const calendarSchema = mongoose.Schema({
    eventName: {
        type: String,
        required: [true, 'Please enter a name for this event.']
    },
    eventDate: {
        type: Date,
        required: [true, 'Please enter the date of the event.'],
        min: [new Date(), 'Please enter a date in the future.']
    },
    eventLocation: {
        type: String
    },
    eventStartTime: {
        type: String
    },
    eventEndTime: {
        type: String
    },
    notes: {
        type: String
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('Event', calendarSchema);