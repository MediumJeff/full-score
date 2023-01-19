const passport = require('passport');
const authenticate = require('../../authenticate');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');


// Create controller with option for admin authentication
// @desc Create new user and encrypt password
// @route POST api/users
// @access Public -- Admin accounts can only be created by other admin accounts
// Account creation must be approved by admin to avoid unauthorized access