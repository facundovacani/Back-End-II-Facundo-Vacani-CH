import mongoose from "mongoose";
import config from "./config.js";

export default class MongoSingleton {
    static #instance;

    constructor() {
        mongoose.connect(config.mongo);
    }

    static getInstance() {
        if (!this.#instance) {
            this.#instance = new MongoSingleton();
            console.log("You are connecting ");
            return this.#instance;
        }
        console.log("You are already connected");
        return this.#instance;
    }
}

