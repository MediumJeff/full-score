const mongoose = require('mongoose');

// Fix time inputs to take actual time inputs
// May be a Front-end alteration for input and keep as String?

const calendarSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter a name for this event.']
    },
    start: {
        type: Date,
        required: [true, 'Please enter the date and time of the event.'],
        min: [new Date(), 'Please enter a date in the future.']
    },
    end: {
        type: Date,
        min: [function(){
            const date = new Date(this.start)
            const validDate = new Date(date.setHours(date.getHours()+1))
            return validDate
        }, "End time must be at least one hour past start time."],
        default: function() {
            const date = new Date(this.start)
            return date.setDate(date.getDate()+1)
        },
    },
    location: {
        name: String,
    },
    notes: {
        type: String
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('Event', calendarSchema);