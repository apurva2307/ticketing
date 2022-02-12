import {
  Publisher,
  Subjects,
  ExpirationCompleteEvent,
} from "@apurva2307/error-handler";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
