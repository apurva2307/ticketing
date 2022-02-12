import { TicketUpdatedListener } from "../ticket-updated-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { Message } from "node-nats-streaming";
import { TicketUpdatedEvent } from "@apurva2307/error-handler";
import mongoose from "mongoose";
import { Ticket } from "../../../models/Ticket-Model";
const setup = async () => {
  const listener = new TicketUpdatedListener(natsWrapper.client);
  // create and save a ticket
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 20,
  });
  await ticket.save();
  // create a fake event
  const data: TicketUpdatedEvent["data"] = {
    version: ticket.version + 1,
    id: ticket.id,
    title: "bookmyshow",
    price: 30,
    userId: new mongoose.Types.ObjectId().toHexString(),
  };
  // create a fake msg object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };
  return { listener, data, msg, ticket };
};

it("finds, updates and saves a ticket", async () => {
  const { listener, data, msg, ticket } = await setup();
  await listener.onMessage(data, msg);
  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.title).toEqual(data.title);
  expect(updatedTicket!.price).toEqual(data.price);
  expect(updatedTicket!.version).toEqual(data.version);
});
it("acks the message", async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

it("does not call ack if event has skipped version number", async () => {
  const { listener, data, msg } = await setup();
  data.version = 2;
  try {
    await listener.onMessage(data, msg);
  } catch (error) {
    console.log(error);
  }

  expect(msg.ack).not.toHaveBeenCalled();
});
