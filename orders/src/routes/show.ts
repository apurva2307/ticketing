import express, { Request, Response } from "express";
import {
  requireAuth,
  NotFoundError,
  UnauthorizedError,
} from "@apurva2307/error-handler";
import { Order } from "../models/Order-Model";
const router = express.Router();

router.get(
  "/api/orders/:orderId",
  requireAuth,
  async (req: Request, res: Response) => {
    const order = await Order.findOne({ _id: req.params.orderId }).populate(
      "ticket"
    );
    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId! !== req.currentUser!.id) {
      throw new UnauthorizedError();
    }
    res.status(200).json({ order });
  }
);

export { router as showOrderRouter };
