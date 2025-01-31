export default class TicketDTO{
    constructor(ticket){
        this.products = ticket.products
        this.totalPrice = ticket.totalPrice
        this.id = ticket._id
    }
}