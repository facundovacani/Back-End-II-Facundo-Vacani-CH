import { ticketModel } from "../../models/index.js";

export default class TicketDao {
    constructor() {}

    getOne = async (ticketId) => {
        try {
            const ticket = await ticketModel.findById(ticketId);
            if (!ticket)
                throw new Error("Not found a ticket with that id: ", ticketId);
            return ticket;
        } catch (err) {
            console.error("Error:", err);
            throw new Error(`Error in get a ticket with that id: ${ticketId}`);
        }
    };

    get = async (filter) => {
        try {
            const ticket = await ticketModel.find(filter);
            return ticket;
        } catch (err) {
            console.error("Error:", err);
            throw new Error(`Error in get tickets`);
        }
    };

    create = async (ticket) => {
        try {
            return await ticketModel.create(ticket);
        } catch (err) {
            console.error("Error:", err);
            throw new Error(err.message);
        }
    };
}
