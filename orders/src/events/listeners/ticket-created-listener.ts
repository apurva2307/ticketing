import {
  Subjects,
  Listener,
  TicketCreatedEvent,
} from "@apurva2307/error-handler";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/Ticket-Model";
import { queueGroupName } from "../queueGroupName";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    const { id, title, price } = data;
    const ticket = Ticket.build({
      id,
      title,
      price,
    });
    await ticket.save();
    msg.ack();
  }
}
