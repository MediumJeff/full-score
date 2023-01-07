const asyncHandler = require('express-async-handler')

// @desc Retrieve student file
// @route GET /api/students
// @access Private after authentication
const getStudent = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: 'Get student file'
    })
})
// @desc Create student file
// @route POST /api/students
// @access Private after authentication
const createStudent = asyncHandler(async (req, res) => {
    if(!req.body) {
        res.status(400)
        throw new Error('Incomplete student file')
    }
    console.log(req.body)
    res.status(200).json({
        message: 'Create student file'
    })
})
// @desc Update student file
// @route PUT /api/students/:id
// @access Private after authentication
const updateStudent = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: `Update student ${req.params.id}`
    })
})
// @desc Delete student file
// @route DELETE /api/students
// @access Private after authentication
const deleteStudent = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: `Delete student ${req.params.id}`
    })
})

module.exports = {
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent,
}