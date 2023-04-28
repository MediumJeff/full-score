const express = require('express');
const router = express.Router();
const {
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent,
    getStudentById
} = require('../controllers/studentController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getStudent).post(protect, createStudent)
router.route('/:id').get(getStudentById).put(protect, updateStudent).delete(protect, deleteStudent)

module.exports = router;