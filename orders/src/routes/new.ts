import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { body, validationResult } from "express-validator";
import {
  validateRequest,
  RequestValidationError,
  requireAuth,
  NotFoundError,
  OrderStatus,
  BadRequestError,
} from "@apurva2307/error-handler";
import { natsWrapper } from "../nats-wrapper";
import { OrderCreatedPublisher } from "../events/publishers/order-created-publisher";
import { Ticket } from "../models/Ticket-Model";
import { Order } from "../models/Order-Model";
const router = express.Router();

router.post(
  "/api/orders",
  requireAuth,
  [
    body("ticketId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("TicketId must be provided."),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { ticketId } = req.body;
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      throw new NotFoundError();
    }
    // make sure that ticket is not already reserved for booking..
    const isReserved = await ticket.isReserved();
    if (isReserved) {
      throw new BadRequestError("Ticket is already reserved.");
    }
    // expiration time for this order
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + 60);
    // build the order and save it to database
    const order = Order.build({
      userId: req.currentUser!.id,
      status: OrderStatus.Created,
      expiresAt: expiration,
      ticket,
    });
    await order.save();
    // emit an event.
    new OrderCreatedPublisher(natsWrapper.client).publish({
      id: order.id,
      version: order.version,
      status: order.status,
      userId: order.userId,
      expiresAt: order.expiresAt.toISOString(),
      ticket: {
        id: ticket.id,
        price: ticket.price,
      },
    });
    res.status(201).json({ order });
  }
);

export { router as newOrderRouter };
