import config from "../../config/config.js";
import { userModel } from "../../models/index.js";
import { generateToken } from "../../utils/jwt.js";

const getUsers = async (req, res) => {
    const users = await userModel.find(req.user.find, {
        first_name: 1,
        last_name: 1,
        age: 1,
        role: 1,
    });
    res.status(200).json(users);
};

const getUser = (req, res) => {
    const { first_name, last_name, age, role } = req.user;
    res.status(200).json({ first_name, last_name, age, role });
};

const logout = (req, res) => {
    res.clearCookie(config.cookiesPass).json({ message: "Sign out correctly" });
};

const login = (req, res) => {
    try {
        if (!req.user) return res.status(400).json({ message: "Login failed" });
        const token = generateToken(req.user);
        res.cookie(config.cookiesPass, token, {
            httpOnly: true,
        });
        res.status(200).json({ message: "Login successful" });
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

const register = (req, res) => {
    try {
        if (!req.user) {
            return res.status(400).json({
                message: "Registration failed",
            });
        }
        const token = generateToken(req.user);
        res.cookie(config.cookiesPass, token, {
            httpOnly: true,
        })
            .status(200)
            .json({ message: "Register successful" });
    } catch (err) {
        res.status(400).send(err);
    }
};

export default {
    getUser,
    getUsers,
    login,
    logout,
    register,
};
