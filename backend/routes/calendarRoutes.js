const express = require('express');
const router = express.Router();
const {
    getEvent,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
} = require('../controllers/calendarController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getEvent).post(protect, createEvent);
router.route('/:id').get(getEventById).put(updateEvent).delete(protect, deleteEvent);

module.exports = router;