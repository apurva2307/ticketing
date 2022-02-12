import {
  Subjects,
  Listener,
  TicketUpdatedEvent,
} from "@apurva2307/error-handler";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/Ticket-Model";
import { queueGroupName } from "../queueGroupName";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName = queueGroupName;
  async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
    const ticket = await Ticket.findByEvent(data);
    if (!ticket) {
      throw new Error("ticket not found.");
    }
    const { title, price } = data;
    ticket.set({ title, price });
    await ticket.save();
    msg.ack();
  }
}
