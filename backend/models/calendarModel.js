const mongoose = require('mongoose');


const calendarSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter a name for this event.']
    },
    start: {
        type: Date,
        required: [true, 'Please enter the date and time of the event.'],
        min: [Date(), 'Please enter a date in the future.'],
    },
    end: {
        type: Date,
        required: [true, 'Please enter the end date and time of the event'],
        min: [this.start]
    },
    location: {
        type: String,
    },
    notes: {
        type: String
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('Event', calendarSchema);