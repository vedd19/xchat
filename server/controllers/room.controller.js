
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const body = require('express-validator')
const roomModel = require('../models/room.model')
const userModel = require('../models/user.model')

module.exports.createRoom = async (req, res) => {
    const otheruser = req.body.otheruser;

    if (!otheruser) {
        return res.status(400).json({
            success: false,
            message: "Other user is required"
        });
    }

    const luser = req.user._id;
    const ouser = otheruser;

    let room = await roomModel.findOne({
        users: { $all: [luser, ouser] }
    });

    if (!room) {
        room = await roomModel.create({
            users: [luser, ouser]
        });
    }

    return res.status(200).json({
        success: true,
        data: room,
        message: "Room initialized"
    });
};


module.exports.userRooms = async (req, res, next) => {

    const token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];;

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