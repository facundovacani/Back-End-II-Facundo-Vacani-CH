import config from "../../config/config.js";
import { UserDTO } from "../../dtos/index.js";
import { usersRepository } from "../../repository/index.js";
import { generateToken } from "../../utils/jwt.js";

class UsersController {
    static async getUsers(req, res) {
        try {
            const users = await usersRepository.getUsers(req.user.find);
            if (users.length === 0) {
                return res.status(404).send({
                    status: false,
                    message: "There are no users",
                });
            }
            return res.status(200).json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                status: false,
                message: "Server error. - ",
                err,
            });
        }
    }

    static async getUser(req, res) {
        const user = new UserDTO(req.user);
        if (!user) {
            return res.status(404).send({
                status: false,
                message: "User not found",
            });
        }
        return res.status(200).json(user);
    }

    static logout(req, res) {
        return res.clearCookie(config.cookiesPass).json({
            message: "Sign out correctly",
        });
    }

    static login(req, res) {
        try {
            if (!req.user)
                return res.status(400).json({ message: "Login failed" });
            const token = generateToken(req.user);
            res.cookie(config.cookiesPass, token, {
                httpOnly: true,
            });
            return res.status(200).json({ message: "Login successful" });
        } catch (err) {
            return res.status(400).json({ message: err });
        }
    }

    static async register(req, res) {
        try {
            if (!req.newUser) {
                return res.status(400).json({
                    message: "Registration failed",
                });
            }
            const user = await usersRepository.createUser(req.newUser);
            const token = generateToken(user);
            res.cookie(config.cookiesPass, token, {
                httpOnly: true,
            })
                .status(200)
                .json({ message: "Register successful" });
        } catch (err) {
            return res.status(400).send(err);
        }
    }
}

export default UsersController;
