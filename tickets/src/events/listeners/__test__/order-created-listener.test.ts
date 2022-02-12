import { OrderCreatedListener } from "../order-created-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { Message } from "node-nats-streaming";
import { OrderCreatedEvent, OrderStatus } from "@apurva2307/error-handler";
import mongoose from "mongoose";
import { Ticket } from "../../../models/Ticket-Model";
const setup = async () => {
  const listener = new OrderCreatedListener(natsWrapper.client);
  // create a ticket
  const ticket = Ticket.build({
    title: "concert",
    price: 30,
    userId: new mongoose.Types.ObjectId().toHexString(),
  });
  await ticket.save();
  // create a fake event
  const data: OrderCreatedEvent["data"] = {
    version: 0,
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: new mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.Created,
    expiresAt: new Date().toISOString(),
    ticket: {
      id: ticket.id,
      price: ticket.price,
    },
  };
  // create a fake msg object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };
  return { listener, data, msg, ticket };
};

it("attach orderId on ticket on receibing event", async () => {
  const { listener, data, msg, ticket } = await setup();
  expect(ticket.orderId).not.toBeDefined();
  await listener.onMessage(data, msg);
  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.orderId).toBeDefined();
  expect(updatedTicket!.orderId).toEqual(data.id);
});
it("acks the message", async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
it("published ticket update event", async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
  const ticketUpdatedData = JSON.parse(
    (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
  );
  expect(ticketUpdatedData.orderId).toEqual(data.id);
});
