import express, { Request, Response } from "express";
import {
  requireAuth,
  NotFoundError,
  UnauthorizedError,
  OrderStatus,
} from "@apurva2307/error-handler";
import { natsWrapper } from "../nats-wrapper";
import { Order } from "../models/Order-Model";
import { OrderCancelledPublisher } from "../events/publishers/order-cancelled-publisher";
const router = express.Router();

router.delete(
  "/api/orders/:orderId",
  requireAuth,
  async (req: Request, res: Response) => {
    const order = await Order.findOne({ id: req.params.orderId }).populate(
      "ticket"
    );
    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId! !== req.currentUser!.id) {
      throw new UnauthorizedError();
    }
    order.status = OrderStatus.Cancelled;
    await order.save();
    // emit an event that order is cancelled.
    new OrderCancelledPublisher(natsWrapper.client).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
      },
    });
    res.status(204).json({ order });
  }
);

export { router as deleteOrderRouter };
