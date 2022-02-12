import {
  Publisher,
  Subjects,
  PaymentCreatedEvent,
} from "@apurva2307/error-handler";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
