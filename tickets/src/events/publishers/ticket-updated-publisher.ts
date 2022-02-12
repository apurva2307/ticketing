import {
    Publisher,
    Subjects,
    TicketUpdatedEvent,
  } from "@apurva2307/error-handler";
  
  export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  }
  