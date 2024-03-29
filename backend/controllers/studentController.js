const asyncHandler = require('express-async-handler');
const Student = require('../models/studentModel');

// @desc Retrieve student file
// @route GET /api/students
// @access Private after authentication
const getStudent = asyncHandler(async (req, res) => {
    let students
    if(req.user.admin) {
        students = await Student.find()
        res.status(200).json(students)
    } else {
        students = await Student.findOne({id: req.user.id})
        res.status(200).json(students)
    }
})

const getStudentById = asyncHandler(async (req, res) => {
    const studentById = await Student.findById(req.params.id)
    res.status(200).json(studentById)
})

// BEWARE of nested data within student files
// @desc Create student file
// @route POST /api/students
// @access Private after authentication
const createStudent = asyncHandler(async (req, res) => {
    const student = await Student.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        studentId: req.body.studentId,
        gradeLevel: req.body.gradeLevel,
        instrument: req.body.instrument,
        ensembles: req.body.ensembles,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        parent: req.body.parent
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

    if (!student || !req.params.id) {
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

    if(req.user.admin){
        await student.remove()
        res.json(`Removed student ${req.params.id}`)
        } else {
            res.status(401)
            throw new Error ('User not authorized.')
        }

    if (!student) {
        res.status(400)
        throw new Error('Student not found')
    }
})

module.exports = {
    getStudent,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent,
}