import {
  Listener,
  OrderCancelledEvent,
  Subjects,
} from "@apurva2307/error-handler";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queueGroupName";
import { Ticket } from "../../models/Ticket-Model";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName: string = queueGroupName;
  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    // find the ticket that the order is reserving
    const ticket = await Ticket.findById(data.ticket.id);
    // if no ticket, throw error
    if (!ticket) {
      throw new Error("Ticket not found.");
    }
    // Mark the ticket as being reserved by setting its orderId property
    ticket.set({ orderId: undefined });
    // save the ticket
    await ticket.save();
    // publish ticket change
    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      version: ticket.version,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      orderId: ticket.orderId,
    });
    // ack the message
    msg.ack();
  }
}
