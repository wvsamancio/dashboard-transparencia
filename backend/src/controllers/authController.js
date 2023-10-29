const userModel = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findByEmail(email);

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const isValidPassword = await bcryptjs.compare(password, user.password);
    if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });

    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
        message: "Login successfully",
        token,
    });
};

const authenticationUser = async (req, res) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ message: "Token not found" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: "Invalid token" });
        }

        return res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

const logout = async (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successfully" });
}

module.exports = {
    login,
    authenticationUser,
    logout
};