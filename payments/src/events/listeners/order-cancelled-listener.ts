import {
  Listener,
  OrderCancelledEvent,
  OrderStatus,
  Subjects,
} from "@apurva2307/error-handler";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queueGroupName";
import { Order } from "../../models/Order-Model";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName: string = queueGroupName;
  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    // find the order that the order is cancelled
    const order = await Order.findOne({
      _id: data.id,
      version: data.version - 1,
    });
    // if no order, throw error
    if (!order) {
      throw new Error("Order not found.");
    }
    order.set({ status: OrderStatus.Cancelled });
    // save the order
    await order.save();
    // ack the message
    msg.ack();
  }
}
