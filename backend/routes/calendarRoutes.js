const express = require('express');
const router = express.Router();
const {
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent
} = require('../controllers/calendarController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getEvent).post(protect, createEvent);
router.route('/:id').put(protect, updateEvent).delete(protect, deleteEvent)

module.exports = router;