const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });

exports.register = async (req, res) => {
    try {
    const user = await User.create(req.body);
    const token = generateToken(user._id);
    res.json({ user, token });
    } catch (err) {
    res.status(400).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user._id);
    res.json({ user, token });
};

exports.logout = (req, res) => {
    res.json({ message: 'Logout handled on client by removing token' });
};