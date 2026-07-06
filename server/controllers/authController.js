const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Signup
exports.signup = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({
                message: "User already exists"
            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({

            name,
            email,
            password: hashedPassword

        });

const { password: _, ...userWithoutPassword } = user.toObject();

res.status(201).json({

    message: "User Registered Successfully",
    user: userWithoutPassword

});

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// Login
exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.status(400).json({
                message: "Invalid Password"
            });

        }

 const token = jwt.sign(

    {
        id: user._id
    },

    process.env.JWT_SECRET,

    {
        expiresIn: "7d"
    }

);

const { password: _, ...userWithoutPassword } = user.toObject();

res.status(200).json({

    message: "Login Successful",

    token,

    user: userWithoutPassword

});

    } catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};
// ======================================
// GET ALL USERS
// ======================================

exports.getUsers = async (req, res) => {

    try {

        const users = await User.find(

            {
                _id: { $ne: req.user.id }
            },

            "-password"

        );

        res.status(200).json(users);

    } catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};

// Get Profile
exports.getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user.id).select("-password");

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        res.status(200).json(user);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};