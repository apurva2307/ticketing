import {
  Listener,
  OrderCreatedEvent,
  Subjects,
} from "@apurva2307/error-handler";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/Order-Model";
import { queueGroupName } from "./queueGroupName";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName: string = queueGroupName;
  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const order = await Order.build({
      id: data.id,
      version: data.version,
      status: data.status,
      userId: data.userId,
      price: data.ticket.price,
    });
    await order.save();
    // ack the message
    msg.ack();
  }
}
