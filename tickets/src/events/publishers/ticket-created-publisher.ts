import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from "@apurva2307/error-handler";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
