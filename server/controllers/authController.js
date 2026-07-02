const User = require("../models/User");
const bcrypt = require("bcryptjs");

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

        res.status(201).json({

            message: "User Registered Successfully",
            user

        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};