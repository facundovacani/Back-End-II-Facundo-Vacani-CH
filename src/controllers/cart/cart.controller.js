import { TicketDTO } from "../../dtos/index.js";
import {
    cartRepository,
    productsRepository,
    ticketRepository,
    usersRepository,
} from "../../repository/index.js";

class CartController {
    static async createCart(req, res) {
        const { products } = req.body;
        try {
            const hasInvalidProducts = products.some(
                (product) => !product.product
            );
            if (hasInvalidProducts && products.length > 0) {
                return res.status(400).json({
                    error: 'Todos los productos deben tener un campo "product" definido.',
                });
            }
            const cart = await cartRepository.createCart(
                req.body,
                req.user._id
            );
            const cartUpdateInUser = { cart: cart.id };
            await usersRepository.updateUserWithCart(
                cartUpdateInUser,
                req.user._id
            );
            return res.status(201).json(cart);
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                status: false,
                message: err.message,
                err,
            });
        }
    }

    static async deleteCart(req, res) {
        try {
            const { id } = req.params;
            await cartRepository.deleteCart(id);
            await usersRepository.updateUserWithCart(
                { cart: "" },
                req.user._id
            );
            return res.status(202).send({
                status: true,
                message: "Delete Cart was successfully",
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

    static async getCart(req, res) {
        try {
            const CartId = req.params.id;
            const Cart = await cartRepository.getCart(CartId);
            return res.status(200).json(Cart);
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                status: false,
                message: err.message,
                err,
            });
        }
    }
    static async getCartByUser(req, res) {
        try {
            const userId = req.user._id;
            const Cart = await cartRepository.getCartByUser(userId);
            return res.status(200).json(Cart);
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                status: false,
                message: err.message,
                err,
            });
        }
    }

    static async updateCart(req, res) {
        try {
            const { id } = req.params;
            await cartRepository.updateCart(id, req.body, req.user._id);
            return res.status(200).json({
                status: true,
                message: "Cart updated successfully.",
            });
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                status: false,
                message: "Error to update a Cart.",
                err,
            });
        }
    }

    static async updateProductInCart(req, res) {
        try {
            const { id } = req.params;
            await cartRepository.updateProductInCart(
                id,
                req.body.quantity,
                req.params.productId
            );
            return res.status(200).json({
                status: true,
                message: "Cart updated successfully.",
            });
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                status: false,
                message: "Error to update a Cart.",
                err,
            });
        }
    }

    static async createAProductInCart(req, res) {
        try {
            await cartRepository.createAProductInCart(req.body, req.params.id);
            return res.status(201).json({
                status: true,
                message: "Cart add new product",
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

    static async finish(req, res) {
        try {
            const cart = await cartRepository.getCart(req.params.id);
            const productsToPurchase = cart.products;
            const notStock = [];
            const stockAvailable = [];
            for (const item of productsToPurchase) {
                const product = await productsRepository.getProduct(
                    item.product
                );

                if (product.stock < item.quantity) {
                    notStock.push({
                        product: item.product,
                        quantity: item.quantity,
                    });
                } else {
                    stockAvailable.push({
                        product: item.product,
                        quantity: item.quantity,
                        price: product.price,
                        total: product.price * item.quantity,
                    });
                    product.stock -= item.quantity;
                    await productsRepository.updateProduct(item.product, {
                        stock: product.stock,
                    });
                }
            }
            if (stockAvailable.length) {
                const ticket = new TicketDTO(
                    await ticketRepository.create({
                        products: stockAvailable,
                        totalPrice: stockAvailable.reduce(
                            (acc, item) => (acc += item.total),
                            0
                        ),
                        userId: req.user._id,
                    })
                );

                await cartRepository.updateCart(
                    req.params.id,
                    { products: notStock.length ? notStock : [] },
                    req.user._id
                );
                return res.status(200).json({
                    status: true,
                    message: "Checkout successfully",
                    success: ticket,
                    notStock,
                });
            }
            return res.status(200).json({
                status: true,
                message: "Checkout not succesfully",
                notStock,
            });
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                status: false,
                message: "Error during checkout. " + err.message,
                err,
            });
        }
    }
}

export default CartController;
