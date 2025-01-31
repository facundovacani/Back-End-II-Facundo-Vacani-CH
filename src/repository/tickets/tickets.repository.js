import { TicketDTO } from "../../dtos/index.js";

export default class TicketRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async getTicket(findTicket) {
        try {
            return  new TicketDTO(await this.dao.getOne(findTicket));
        } catch (err) {
            console.log(err);
        }
    }

    async getTickets(filter) {
        try {            
            const tickets = await this.dao.get(filter)
            return tickets.map(ticket => new TicketDTO(ticket));
        } catch (err) {
            console.log(err);
        }
    }

    async create(ticket) {
        try {
            return await this.dao.create(ticket);
        } catch (err) {
            console.log(err);
        }
    }
}
