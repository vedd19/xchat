const express = require('express')
const router = express.Router();
const { body } = require('express-validator')
const userController = require('../controllers/user.controller')

router.post('/register', [body('email').notEmpty().withMessage('All fields are required'),
body('fullName').notEmpty().withMessage('All fields are required'),
body('password').notEmpty().withMessage('All fields are required'),
body('username').notEmpty().withMessage('All fields are required')],
    userController.registerUser
)

module.exports = router