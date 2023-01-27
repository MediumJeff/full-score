const express = require('express');
const router = express.Router();
const { newUser,
    loginUser,
    getUser
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', newUser);
router.post('/login', loginUser);
router.get('/user', protect, getUser);

module.exports = router;