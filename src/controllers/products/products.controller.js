import { productsRepository } from "../../repository/index.js";

class ProductsController {
    static async createProduct(req, res) {
        try {
            const product = await productsRepository.createProduct(req.body);
            return res.status(201).json(product);
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                status: false,
                message: "Error to create a product.",
                err,
            });
        }
    }

    static async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            await productsRepository.deleteProduct(id);
            return res.status(202).send({
                status: true,
                message: "Delete product was successfully",
            });
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                status: false,
                message: err.message,
                err,
            });
        }
    }

    static async getProducts(req, res) {        
        try {
            const filters = {
                ...(req.query.category
                    ? { category: req.query?.category }
                    : undefined),
            };
            const products = await productsRepository.getProducts(filters);
            return res.status(200).json(products);
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                status: false,
                message: "Error to find products.",
                err,
            });
        }
    }

    static async getProduct(req, res) {
        try {
            const productId = req.params.id;
            const product = await productsRepository.getProduct(productId);
            return res.status(200).json(product);
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                status: false,
                message: err.message,
                err,
            });
        }
    }

    static async updateProduct(req, res) {
        try {
            const { id } = req.params;
            await productsRepository.updateProduct(
                id,
                req.body
            );
            return res.status(200).json({
                status: true,
                message: "Product updated successfully.",
            });
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                status: false,
                message: "Error to update a product.",
                err,
            });
        }
    }
}

export default ProductsController;
