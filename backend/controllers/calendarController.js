const asyncHandler = require('express-async-handler');
const Event = require('../models/calendarModel');

// @desc Retrieve list of events
// @route GET api/calendar
// @access Public
const getEvent = asyncHandler(async (req,res) => {
    const events = await Event.find()
    res.status(200).json(events)
})

// @desc Create new event
// @route POST api/calendar
// @access Admin only
const createEvent = asyncHandler(async (req, res) => {
    if(!req.user.admin) {
        res.status(403)
        throw new Error('User not authorized.')
    }

    const newEvent = await Event.create({
        eventName: req.body.eventName,
        eventDate: req.body.eventDate,
        eventStartTime: req.body.eventStartTime,
        eventEndTime: req.body.eventEndTime
    })
    if(!req.body) {
        res.status(400)
        throw new Error('Incomplete event entry.')
    }

    res.status(200).json(newEvent)
})

// @desc Update existing event
// @route PUT api/calendar
// @access Admin only
const updateEvent = asyncHandler(async (req, res) => {
    if(!req.user.admin) {
        res.status(403)
        throw new Error('User not authorized.')
    }

    const event = await Event.findById(req.params.id)

    if(!event) {
        res.status(400)
        throw new Error('Event not found.')
    }

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    res.status(200).json(updatedEvent)
})

// @desc Remove event
// @route DELETE api/calendar
// @access Admin only
const deleteEvent = asyncHandler(async (req,res) => {
    if(!req.user.admin) {
        res.status(403)
        throw new Error('User not authorized.')
    }

    const event = await Event.findById(req.params.id)

    if(!event) {
        res.status(400)
        throw new Error('Event not found.')
    }

    event.remove();
    res.json(`Removed following event: ${event}`)
})

module.exports = {
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent
}