import dotenv from "dotenv";

dotenv.config();

const config = {
    port: process.env.PORT || 8080,
    mongo: process.env.MONGO_CONNECT,
    secretJwt: process.env.SECRET_JWT,
    cookiesPass: process.env.COOKIES_PASS || "coderFacu",
};

Object.keys(config).forEach((key) => {
    if (!config[key]) {
        console.warn(
            key,
            " es requerido para poner en funcionamiento el servidor"
        );
        throw new Error(key);
    }
});

export default config;
