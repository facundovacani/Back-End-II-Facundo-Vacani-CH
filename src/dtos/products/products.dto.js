export default class ProductsDTO{
    constructor(products){
        this.title = products.title
        this.description = products.description
        this.category = products.category
        this.price = products.price
        this.stock = products.stock
        this.id = products._id
    }
}