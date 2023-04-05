const asyncHandler = require('express-async-handler');
const Event = require('../models/calendarModel');

// @desc Retrieve list of events
// @route GET api/calendar
// @access Public
const getEvent = asyncHandler(async (req,res) => {
    const events = await Event.find()
    res.status(200).json(events)
})

const getEventById = asyncHandler(async (req, res) => {
    const eventById = await Event.findById(req.params.id)
    res.status(200).json(eventById)
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
        title: req.body.title,
        start: req.body.start,
        end: req.body.end,
        location: req.body.location,
        notes: req.body.notes
    })
    if(!req.body) {
        res.status(400)
        throw new Error('Incomplete event entry.')
    }

    res.status(200).json(newEvent)
})

// @desc Update existing event
// @route PUT api/calendar/:id
// @access Admin only
const updateEvent = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id)

    if(!event) {
        res.status(401)
        throw new Error('Event not found.')
    }

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        start: req.body.start,
        end: req.body.end,
        location: req.body.location,
        notes: req.body.notes

    }, {
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
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
}