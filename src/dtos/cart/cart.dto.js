export default class CartDTO{
    constructor(cart){
        this.products = cart.products
        this.id = cart._id
    }
}