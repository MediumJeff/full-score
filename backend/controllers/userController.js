const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');


// Create controller with option for admin authentication, or is it just part of the user file (user.admin)
// @desc Create new user and encrypt password
// @route POST api/users
// @access Public -- Admin accounts can only be created by other admin accounts
// Account creation must be approved by admin to avoid unauthorized access, add approval Boolean in model?
const newUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body
    if(!firstName || !lastName || !email || !password) {
        res.status(400)
        throw new Error('Please fill in all fields.')
    }

    // Check for duplicate user file
    const userExists = await User.findOne({ email })

    if(userExists) {
        res.status(400)
        throw new Error('User account already exists.')
    }

    // Hash passwords with bcrypt
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user file
    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword
    })

    if(user) {
        res.status(201)
        res.json({
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc Authencicate user
// @route POST api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // Check for user email
    const user = await User.findOne({ email })

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials.')
    }
})

// @desc Retrieve user data
// @route GET api/users/user
// @access Private upon login
const getUser = asyncHandler(async (req, res) => {
    const { _id, firstName, lastName, email } = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        firstName,
        lastName,
        email
    })
})

// Generate web token (JWT)
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    newUser,
    loginUser,
    getUser
};