import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { usersRouter } from "./src/routes/index.js";
import config from "./src/config/config.js";
import passportInit from "./src/config/passport.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/sessions", usersRouter);
passportInit();

mongoose.connect(config.mongo);

app.listen(config.port, () => {
    console.log("Servidor escuchando desde el puerto " + config.port);
});
