import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const generateToken = (user) =>
    jwt.sign({ user }, config.secretJwt, { expiresIn: 1000 * 60 * 10 });

export const createPass = (password) =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isUserPassword = (user, password) =>
    bcrypt.compareSync(password, user?.password);
