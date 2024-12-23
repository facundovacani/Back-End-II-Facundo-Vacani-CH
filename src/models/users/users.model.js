import { model, Schema } from "mongoose";

const userSchema = Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cart: {
        type: String,
        ref: "Carts",
        default: "",
    }, 
    role: {
        type: String,
        default: "user",
    },
});

export default model("User", userSchema)