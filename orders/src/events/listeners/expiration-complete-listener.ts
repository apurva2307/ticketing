import {
  Subjects,
  Listener,
  ExpirationCompleteEvent,
  OrderStatus,
} from "@apurva2307/error-handler";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/Order-Model";
import { natsWrapper } from "../../nats-wrapper";
import { OrderCancelledPublisher } from "../publishers/order-cancelled-publisher";
import { queueGroupName } from "../queueGroupName";

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
  queueGroupName = queueGroupName;
  async onMessage(data: ExpirationCompleteEvent["data"], msg: Message) {
    const { orderId } = data;
    const order = await Order.findById(orderId).populate("ticket");
    if (!order) {
      throw new Error("No order found.");
    }
    if (order.status == OrderStatus.Completed) {
      return msg.ack();
    }
    order.set({ status: OrderStatus.Cancelled });
    await order.save();
    new OrderCancelledPublisher(natsWrapper.client).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
      },
    });
    msg.ack();
  }
}
