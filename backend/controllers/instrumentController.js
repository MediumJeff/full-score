const asyncHandler = require('express-async-handler');
const Instrument = require('../models/instrumentModel');

// @desc Retrieve instrument inventory files
// @route GET /api/instruments
// @access Only available to account administrators
const getInstrument = asyncHandler(async (req, res) => {
    let instrument
    if (req.user.admin) {
        instrument = await Instrument.find()
        res.status(200).json(instrument)
    } else {
        res.status(401)
        throw new Error('User not authorized.')
    }
})

// BEWARE of optional items within schema. See how they play out.
// @desc Create new instrument files
// @route POST /api/instruments
// @access Only available to account administrators
const createInstrument = asyncHandler(async (req, res) => {
    if (req.user.admin) {
        const instrument = await Instrument.create({
            type: req.body.type,
            make: req.body.make,
            model: req.body.model,
            serialNumber: req.body.serialNumber,
            schoolNumber: req.body.schoolNumber,
            assignedTo: req.body.assignedTo,
            damageNotes: req.body.damageNotes
        })
        if (!req.body.type) {
            res.status(400)
            throw new Error('Please enter an instrument type to begin.')
        }

        res.status(200).json(instrument)
    } else {
        res.status(401)
        throw new Error ('User not authorized.')
    }
})

// @desc Update instrument files
// @route PUT /api/instruments/:id
// @access Only available to account administrators
const updateInstrument = asyncHandler(async (req, res) => {
    if (req.user.admin) {
        const instrument = await Instrument.findById(req.params.id)

        if (!instrument) {
            res.status(400)
            throw new Error('Instrument not found.')
        }

        const updatedInstrument = await Instrument.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })

        res.status(200).json(updatedInstrument)
    }
})

// --> Restructure this to create an archive of instruments that have been lost, stolen, or broken beyond repair.
// @desc Remove instrument from inventory
// @route DELETE /api/instrument/:id
const deleteInstrument = asyncHandler(async (req, res) => {
    if (req.user.admin) {
        const instrument = await Instrument.findById(req.params.id)

        if (!instrument) {
            res.status(400)
            throw new Error('Instrument not found.')
        }

        await instrument.remove()
        res.json(`Removed ${instrument}`)
    }
})

module.exports = {
    getInstrument,
    createInstrument,
    updateInstrument,
    deleteInstrument,
}