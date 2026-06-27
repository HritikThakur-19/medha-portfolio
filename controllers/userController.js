const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register
const register = async (req, res) => {

    const { username, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        password: hashed
    });

    res.json(user);

};

// Login
const login = async (req, res) => {

    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user)
        return res.status(401).json({ message: "Invalid Username" });

    const match = await bcrypt.compare(password, user.password);

    if (!match)
        return res.status(401).json({ message: "Invalid Password" });

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.json({
        token
    });

};

module.exports = {
    register,
    login
};