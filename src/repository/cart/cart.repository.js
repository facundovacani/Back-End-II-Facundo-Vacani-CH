import { CartDTO } from "../../dtos/index.js";

export default class CartRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async getCart(cartId) {
        const cart = await this.dao.getOne(cartId);        
        return new CartDTO(cart);
    }

    async getCartByUser(cartId) {
        const cart = await this.dao.getOneByUser(cartId);
        return new CartDTO(cart);
    }

    async createCart(cart, user) {
        return new CartDTO(await this.dao.create(cart, user));
    }

    async createAProductInCart(cart, user) {
        return new CartDTO(await this.dao.createAProductInCart(cart, user));
    }

    async updateCart(id, cart, userId) {
        return await this.dao.updateOne(id, cart, userId);
    }

    async updateProductInCart(id, productQty, productId) {
        return await this.dao.updateProduct(id, productQty, productId);
    }

    async deleteCart(cartId) {
        await this.getCart(cartId);
        return await this.dao.delete(cartId);
    }
}
