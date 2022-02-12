import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import {
  validateRequest,
  RequestValidationError,
  requireAuth,
} from "@apurva2307/error-handler";
import { natsWrapper } from "../nats-wrapper";
import { Ticket } from "../models/Ticket-Model";
import { TicketCreatedPublisher } from "../events/publishers/ticket-created-publisher";
const router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title must be provided."),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than zero."),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { title, price } = req.body;
    const ticket = Ticket.build({ title, price, userId: req.currentUser!.id });
    await ticket.save();
    new TicketCreatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      version: ticket.version,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
    });
    res.status(201).json({ ticket });
  }
);

export { router as createTicketRouter };
