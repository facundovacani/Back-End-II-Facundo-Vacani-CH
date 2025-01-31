import { ProductsDTO } from "../../dtos/index.js";

export default class ProductsRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async getProducts(filters) {
        const result = await this.dao.get(filters);
        return result.map((product) => new ProductsDTO(product));
    }

    async getProduct(productId) {
        const product = await this.dao.getOne(productId)        
        return new ProductsDTO(product);
    }

    async createProduct(product) {
        return new ProductsDTO(await this.dao.create(product));
    }
    async updateProduct(id,product) {
        return await this.dao.update(id,product)
    }

    async deleteProduct(productId) {
        const product = await this.getProduct(productId);
        return await this.dao.delete(productId);
    }
}
