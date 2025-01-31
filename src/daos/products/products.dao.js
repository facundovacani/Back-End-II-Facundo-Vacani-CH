import { UserDTO } from "../../dtos/index.js";
import { productsModel } from "../../models/index.js";

export default class ProductsDao {
    constructor() {}
    get = async (filters) => {
        try {
            return await productsModel.find({ ...filters });
        } catch (err) {
            console.error("Error:", err);
            throw new Error("Error in get products - ", err);
        }
    };

    getOne = async (productId) => {
        try {
            const product = await productsModel.findById(productId);
            if (!product)
                throw new Error(
                    "Not found a product with that id: ",
                    productId
                );
            return product;
        } catch (err) {
            console.error("Error:", err);
            throw new Error(
                `Error in get a product with that id: ${productId}`
            );
        }
    };

    create = async (product) => {
        try {
            return await productsModel.create(product);
        } catch (err) {
            console.error("Error:", err);
            throw new Error("Error in get a product - ", err);
        }
    };

    update = async (id, product) => {
        const updateProduct = {
            $set: {
                ...product,
            },
        };
        try {
            return await productsModel.updateOne({ _id: id }, updateProduct);
        } catch (err) {
            console.error("Error:", err);
            throw new Error("Error in get a product - ", err);
        }
    };

    delete = async (productId) => {
        try {
            return await productsModel.deleteOne({ _id: productId });
        } catch (err) {
            throw new Error("Error to delete a product - ", err);
        }
    };
}
