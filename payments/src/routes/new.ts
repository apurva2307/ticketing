import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import {
  validateRequest,
  RequestValidationError,
  requireAuth,
  NotFoundError,
  UnauthorizedError,
  OrderStatus,
  BadRequestError,
} from "@apurva2307/error-handler";
import { natsWrapper } from "../nats-wrapper";
import { Order } from "../models/Order-Model";
import { Payment } from "../models/Payment-Model";
import { stripe } from "../stripe";
import { PaymentCreatedPublisher } from "../events/publishers/payment-created-publisher";
const router = express.Router();

router.post(
  "/api/payments",
  requireAuth,
  [
    body("token").not().isEmpty().withMessage("Token must be provided."),
    body("orderId").not().isEmpty().withMessage("OrderId must be provided"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { token, orderId } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new UnauthorizedError();
    }
    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError("Can't pay for an cancelled order.");
    }
    // await stripe.charges.create({
    //   currency: "usd",
    //   amount: order.price * 100,
    //   source: token,
    // });
    const paymentId = "1234";
    const payment = Payment.build({
      orderId: order.id,
      paymentId,
    });
    await payment.save();
    await new PaymentCreatedPublisher(natsWrapper.client).publish({
      id: payment.id,
      orderId: payment.orderId,
      paymentId,
    });
    res.status(201).json({ payment });
  }
);

export { router as createChargeRouter };
