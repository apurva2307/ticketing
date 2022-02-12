import {
  Subjects,
  Listener,
  PaymentCreatedEvent,
  NotFoundError,
  OrderStatus,
} from "@apurva2307/error-handler";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/Order-Model";
import { queueGroupName } from "../queueGroupName";

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: PaymentCreatedEvent["data"], msg: Message) {
    const { orderId } = data;
    const order = await Order.findById(orderId);
    if (!order) {
      throw new NotFoundError();
    }
    order.set({ status: OrderStatus.Completed });
    await order.save();
    msg.ack();
  }
}
