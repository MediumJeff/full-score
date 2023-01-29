const express = require('express');
const router = express.Router();
const {
    getInstrument,
    createInstrument,
    updateInstrument,
    deleteInstrument
} = require('../controllers/instrumentController');
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getInstrument).post(protect, createInstrument);
router.route('/:id').put(protect, updateInstrument).delete(protect, deleteInstrument)

module.exports = router;