import {
  Publisher,
  Subjects,
  OrderCancelledEvent,
} from "@apurva2307/error-handler";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
