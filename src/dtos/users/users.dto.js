export default class UserDTO{
    constructor(user){
        this.firstName = user.first_name
        this.lastName = user.last_name
        this.age = user.age
        this.cart = user.cart
    }
}