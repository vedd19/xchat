const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const body = require('express-validator')
const userModel = require('../models/user.model')

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            "success": false,
            "message": "All fields are required",
            "err": errors.array()
        })
    }

    const { fullName, email, username, password } = req.body

    const emailExists = await userModel.findOne({ email: email })
    if (emailExists) {
        return res.status(409).json({
            "success": false,
            "message": "Email is already registered"
        })
    }

    const usernameExists = await userModel.findOne({ username: username })
    if (usernameExists) {
        return res.status(409).json({
            "success": false,
            "message": "Username is already taken"
        })
    }

    const hashedPassword = await userModel.hashPassword(password);
    // console.log(hashedPassword)

    try {

        const user = await userModel.create({
            fullName,
            email,
            password: hashedPassword,
            username,
            avatar: `https://avatar.iran.liara.run/username?username=${fullName}`
        });

        // console.log(user, "user")
        const token = user.generateAuthToken();
        // console.log("token", token)
        res.cookie(token);

        res.status(201).json({
            success: true,
            token: token,
            data: user,
            message: "User created successfully",
        })
    }
    catch (err) {
        console.log(err)
    }
}

// module.exports.loginUser = async (req, res, next) => {

// }