const User = require("../models/Auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {

        const existingUser = await User.findOne({
            email: req.body.email
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User Already Exists"
            });
        }

        const hashPassword = await bcrypt.hash(
            req.body.password,
            10
        );

        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword
        });

        res.status(201).json({
            message: "Register Success",
            user
        });

    } catch (err) {

        console.log("REGISTER ERROR:", err);

        res.status(500).json({
            error: err.message
        });

    }
};

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        });

        if (!user) {
            return res.status(400).json({
                message: "User Not Found"
            });
        }

        const isMatch = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Password"
            });
        }

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({
                message: "JWT secret is not configured"
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

        res.json({
            message: "Login Success",
            token
        });

    } catch (err) {
        console.log("LOGIN ERROR:", err);

        res.status(500).json({
            error: err.message
        });
    }
};