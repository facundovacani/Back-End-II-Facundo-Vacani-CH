export default class TicketDTO{
    constructor(ticket){
        this.products = ticket.products
        this.amount = ticket.amount
        this.code = ticket.code
        this.purchaser = ticket.purchaser
    }
}