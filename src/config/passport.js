import passport from "passport";
import jwt, { ExtractJwt } from "passport-jwt";
import local from "passport-local";
import config from "./config.js";
import { createPass, isUserPassword } from "../utils/jwt.js";
import { usersRepository } from "../repository/index.js";

const passportInit = () => {
    passport.use(
        "current",
        new jwt.Strategy(
            {
                jwtFromRequest: ExtractJwt.fromExtractors([
                    (req) =>
                        req && req.cookies
                            ? req.cookies[config.cookiesPass]
                            : null,
                ]),
                secretOrKey: config.secretJwt,
            },
            async (jwt_payload, done) => {
                try {
                    return done(null, jwt_payload.user);
                } catch (err) {
                    return done(err, false, {
                        message: "There is a problem with the current session",
                    });
                }
            }
        )
    );

    passport.use(
        "register",
        new local.Strategy(
            {
                passReqToCallback: true,
                usernameField: "email",
            },
            async (req, username, password, done) => {
                const { first_name, last_name, age } = req.body;
                try {
                    const user = await usersRepository.getUser(username);
                    if (user)
                        return done(null, false, {
                            message: "Already exist user with that email",
                        });
                    const newUser = {
                        email: username,
                        password: createPass(password),
                        first_name,
                        last_name,
                        age,
                    };
                    req.newUser = newUser;
                    return done(null, req.newUser);
                } catch (err) {
                    return done(err);
                }
            }
        )
    );

    passport.use(
        "login",
        new local.Strategy(
            {
                usernameField: "email",
            },
            async (username, password, done) => {
                try {
                    const user = await usersRepository.getUser(username);
                    if (!user)
                        return done(null, false, {
                            message: "There is a problem with that username",
                        });
                    if (!password)
                        return done(null, false, {
                            message: "Password is required",
                        });
                    if (!isUserPassword(user, password)) {
                        return done(null, false, {
                            message: "failed to try to login",
                        });
                    }
                    return done(null, {
                        role: user.role,
                        cart: user?.cart,
                        first_name: user.first_name,
                        _id: user._id,
                        age: user.age,
                        last_name: user.last_name,
                        email: user.email
                    });
                } catch (err) {
                    return done(err);
                }
            }
        )
    );
};

export default passportInit;
