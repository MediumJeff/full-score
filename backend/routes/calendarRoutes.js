const express = require('express');
const router = express.Router();
const {
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent
} = require('../controllers/calendarController');

router.route('/').get(getEvent).post(createEvent);
router.route('/:id').put(updateEvent).delete(deleteEvent)

module.exports = router;