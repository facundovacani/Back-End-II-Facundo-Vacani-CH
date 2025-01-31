import { ticketRepository } from "../../repository/index.js";

class TicketController {
    static async getTicket(req, res) {
        try {
            const ticketId = req.params.id;
            const ticket = await ticketRepository.getTicket(ticketId);
            return res.status(200).json(ticket);
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                status: false,
                message: err.message,
                err,
            });
        }
    }

    static async getTickets(req, res) {
        try {
            const filters = {
                ...(req.query.userId && req.user.role
                    ? { userId: req.query?.category }
                    : { userId: req.user._id}),
            };
            const tickets = await ticketRepository.getTickets(filters);
            return res.status(200).json(tickets);
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                status: false,
                message: "Error to find products.",
                err,
            });
        }
    }
}

export default TicketController;
