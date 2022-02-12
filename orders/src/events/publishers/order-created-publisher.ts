import {
  Publisher,
  Subjects,
  OrderCreatedEvent,
} from "@apurva2307/error-handler";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
