const express = require('express')
const router = express.Router();
const { body } = require('express-validator')
const roomController = require('../controllers/room.controller')
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/init', authMiddleware.authMiddleware, roomController.createRoom)
router.get('/userrooms', authMiddleware.authMiddleware, roomController.userRooms)

module.exports = router;