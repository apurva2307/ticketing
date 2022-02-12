import { OrderCreatedListener } from "../order-created-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { Message } from "node-nats-streaming";
import { OrderCreatedEvent, OrderStatus } from "@apurva2307/error-handler";
import mongoose from "mongoose";
import { Order } from "../../../models/Order-Model";
const setup = async () => {
  const listener = new OrderCreatedListener(natsWrapper.client);

  // create a fake event
  const data: OrderCreatedEvent["data"] = {
    version: 0,
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: new mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.Created,
    expiresAt: new Date().toISOString(),
    ticket: {
      id: new mongoose.Types.ObjectId().toHexString(),
      price: 30,
    },
  };
  // create a fake msg object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };
  return { listener, data, msg };
};

it("create order on receiving event", async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);
  const order = await Order.findById(data.id);
  expect(order!.price).toEqual(data.ticket.price);
});
it("acks the message", async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
