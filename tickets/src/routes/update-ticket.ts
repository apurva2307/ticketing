import express, { Request, Response } from "express";
import { Ticket } from "../models/Ticket-Model";
import { body, validationResult } from "express-validator";
import {
  validateRequest,
  requireAuth,
  NotFoundError,
  UnauthorizedError,
  RequestValidationError,
  BadRequestError,
} from "@apurva2307/error-handler";
import { TicketUpdatedPublisher } from "../events/publishers/ticket-updated-publisher";
import { natsWrapper } from "../nats-wrapper";
const router = express.Router();

router.put(
  "/api/tickets/:id",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title must be provided."),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than zero."),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, price } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const ticket = await Ticket.findById({ _id: id });
    if (!ticket) {
      throw new NotFoundError();
    }
    if (ticket.userId !== req.currentUser!.id) {
      throw new UnauthorizedError();
    }
    if (ticket.orderId) {
      throw new BadRequestError("Can't edit a reserved ticket.");
    }
    ticket.set({ title, price });
    await ticket.save();
    await new TicketUpdatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      version: ticket.version,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
    });
    res.status(200).json({ ticket });
  }
);

export { router as updateTicketRouter };
