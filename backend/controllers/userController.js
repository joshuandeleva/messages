const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require("express-async-handler");
const User = require('../models/user')


// @desc Register user
// @routes POST /api/users/register
// @access Public

const registerUser = asyncHandler(async (req, res) => {

    //request data from user

    const { name, password, email } = req.body


    //validates all user data has been passed

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all the fields')
    }

    //check if user exists

    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    //hash Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)



    //create new user

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })


    //check user was created

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
})


// @desc Aunthenticate user
// @routes POST /api/login
// @access Public

const loginUser = asyncHandler(async (req, res) => {
    //get data from user

    const { email, password } = req.body

    //check if email exists

    const user = await User.findOne({ email })


    //compare 

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid credentials");
    }

})


//generate JWT token

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};


module.exports = { registerUser, loginUser }