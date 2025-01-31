import { Router } from "express";
import { passportCall } from "../../utils/passportCall.js";
import { TicketController } from "../../controllers/index.js";
import { authorization } from "../../middleware/permissions.js";
import { rols } from "../../const/rols.js";

const router = Router();
router.get(
    "/",
    passportCall("current"),
    authorization(rols),
    TicketController.getTickets
);

router.get(
    "/:id",
    passportCall("current"),
    authorization(rols),
    TicketController.getTicket
);

export default router;
