const asyncHandler = require('express-async-handler');
const Student = require('../models/studentModel');

// @desc Retrieve student file
// @route GET /api/students
// @access Private after authentication
const getStudent = asyncHandler(async (req, res) => {
    const students = await Student.find()
    res.status(200).json(students)
})

// BEWARE of nested data within student files
// @desc Create student file
// @route POST /api/students
// @access Private after authentication
const createStudent = asyncHandler(async (req, res) => {
    const student = await Student.create({
        name: req.body.name,
        studentId: req.body.id,
        instrument: req.body.instrument
    })
    if (!req.body) {
        res.status(400)
        throw new Error('Incomplete student file')
    }
    res.status(200).json(student)
})

// @desc Update student file
// @route PUT /api/students/:id
// @access Private after authentication
const updateStudent = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.params.id)

    if (!student) {
        res.status(400)
        throw new Error('Student not found')
    }

    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedStudent)
})

// --> Create archive option for graduated students, students who left program
// @desc Delete student file
// @route DELETE /api/students
// @access Private after authentication
const deleteStudent = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.params.id)

    if (!student) {
        res.status(400)
        throw new Error('Student not found')
    }

    await student.remove()
    res.json(`Removed student ${req.params.id}`)
})

module.exports = {
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent,
}