const express = require('express');
const router = express.Router();
const {
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent
} = require('../controllers/studentController');

router.route('/').get(getStudent).post(createStudent)
router.route('/:id').put(updateStudent).delete(deleteStudent)

module.exports = router;