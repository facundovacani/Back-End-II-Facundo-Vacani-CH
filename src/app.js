import express from "express";
import cookieParser from "cookie-parser";
import config from "./config/config.js";
import passportInit from "./config/passport.js";
import MongoSingleton from "./config/mongoSingleton.js";
import {
    cartRouter,
    productsRouter,
    ticketRouter,
    usersRouter,
} from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/sessions", usersRouter);
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/tickets", ticketRouter);
passportInit();

MongoSingleton.getInstance();

app.listen(config.port, () => {
    console.log("Servidor escuchando desde el puerto " + config.port);
});
