const express = require('express');
const router = express.Router();
const {
    getInstrument,
    createInstrument,
    updateInstrument,
    deleteInstrument
} = require('../controllers/instrumentController');

router.route('/').get(getInstrument).post(createInstrument);
router.route('/:id').put(updateInstrument).delete(deleteInstrument)

module.exports = router;