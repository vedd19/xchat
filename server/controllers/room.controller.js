
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const body = require('express-validator')
const roomModel = require('../models/room.model')
const userModel = require('../models/user.model')

module.exports.createRoom = async (req, res, next) => {

    const token = req.cookies.accessToken;
    if (!token) {
        return res.status(401).json({
            "success": false,
            "message": "Invalid access token"
        })
    }

    const otheruser = req.body.otheruser;
    if (!otheruser) {
        return res.status(400).json({
            "success": false,
            "message": "Other user is required to create a chat room"
        })
    }

    const loggedInUser = req.user._id;

    // luser = req.user;
    // ouser = await userModel.findById(otheruser)

    let room;
    room = await roomModel.findOne({ users: [loggedInUser, otheruser] })

    console.log(room)

    if (!room) {
        console.log("hello")
        try {
            room = await roomModel.create({ users: [loggedInUser, otheruser] });
        } catch (error) {
            return res.status(500).json({ message: "DB error during room creation" })
        }
    }



    res.status(200).json({
        "success": true,
        // "roomId": room._id,
        "data": room,
        "message": "Room initialized successfully"
    })
}

module.exports.userRooms = async (req, res, next) => {

    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({
            "success": false,
            "message": "Invalid access token"
        })
    }

    const allRooms = await roomModel.find({ users: req.user._id })

    res.status(200).json({
        "success": true,
        "data": allRooms,
        "message": "Rooms fetched successfully"
    })

}