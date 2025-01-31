import { cartModel } from "../../models/index.js";
import { Types } from "mongoose";

export default class cartDao {
    constructor() {}

    getOne = async (cartId) => {
        try {
            const cart = await cartModel.findById(cartId);
            if (!cart)
                throw new Error("Not found a cart with that id: ", cartId);
            return cart;
        } catch (err) {
            console.error("Error:", err);
            throw new Error(`Error in get a cart with that id: ${cartId}`);
        }
    };

    getOneByUser = async (userId) => {        
        try {
            const cart = await cartModel.findOne({userId});
            if (!cart)
                throw new Error("Not found a cart with that user's id: ", userId);
            return cart;
        } catch (err) {
            console.error("Error:", err);
            throw new Error(`Error in get a cart with that user's id: ${userId}`);
        }
    };

    create = async (products, userId) => {
        try {
            return await cartModel.create({ ...products, userId });
        } catch (err) {
            console.error("Error:", err);
            throw new Error(err.message);
        }
    };

    createAProductInCart = async (products, cartId) => {
        const newProduct = { $push: { products } };
        try {
            const cart = await cartModel.findOne({
                _id: cartId,
            });
            if (!cart) {
                throw new Error("Cart not exist for this user.");
            }
            return await cartModel.updateOne({ _id: cartId }, newProduct);
        } catch (err) {
            console.error("Error:", err);
            throw new Error(err.message);
        }
    };

    updateOne = async (id, cart, userId) => {
        const updateCart = {
            $set: {
                ...cart,
            },
        };
        try {
            return await cartModel.updateOne(
                { _id: id },
                { ...updateCart, userId }
            );
        } catch (err) {
            console.error("Error:", err);
            throw new Error("Error in get a cart - ", err);
        }
    };

    updateProduct = async (id, productsQty, productId) => {
        try {
            return await cartModel.updateOne(
                { _id: id, "products.product": productId },
                {
                    $set: {
                        "products.$.quantity": Number(productsQty),
                    },
                }
            );
        } catch (err) {
            console.error("Error:", err);
            throw new Error("Error in get a cart - ", err);
        }
    };

    delete = async (cartId) => {
        try {
            return await cartModel.deleteOne({ _id: cartId });
        } catch (err) {
            throw new Error("Error to delete a cart - ", err);
        }
    };
}
