/**
 * Controller functions for registering a user, signing in a user basically
 */
import User from "../data/models/User.js";
import bcrypt from 'bcryptjs';
import { generateToken } from "../util/generateToken.js";
// @desc    Register new user
// @route   POST /api/users/signup
// @access  Public
const registerUser = async (req, res) => {
    try {
        //retrieve the input
        const { first_name, last_name, email, password } = req.body;
        // Validate user input
        if (!(email && password && first_name && last_name)) {
            res.status(400).send("All input is required");
        }
        // check if user already exists
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please ");
        }
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            first_name,
            last_name,
            email,
            password: hashedPassword
        });
        if (user) {
            res.status(201).json({
                _id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                token: generateToken(user._id)
            });
        }
        else {
            res.status(400).send("Invalid User data");
        }
    }
    catch (err) {
        res.send(`E make beans: ${err}`);
    }
};
// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                token: generateToken(user._id)
            });
        }
        else {
            res.status(400).send("Invalid Credentials");
        }
    }
    catch (err) {
        res.send(`E make beans: ${err}`);
    }
};
// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = (req, res) => {
    res.status(200).json(req.body.user);
};
export { registerUser, loginUser, getMe };
