import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";
import { natsWrapper } from "../../nats-wrapper";
import { Ticket } from "../../models/Ticket-Model";
import { Order } from "../../models/Order-Model";

it("Order status changes to cancelled and returns 204", async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 35,
    id: new mongoose.Types.ObjectId().toHexString(),
  });
  await ticket.save();
  const userOne = global.signin();
  const {
    body: { order },
  } = await request(app)
    .post("/api/orders")
    .set("Cookie", userOne)
    .send({ ticketId: ticket.id })
    .expect(201);
  expect(order.status).toEqual("created");
  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set("Cookie", userOne)
    .send()
    .expect(204);
  const resOrder = await Order.findById({ _id: order.id });
  expect(resOrder!.status).toEqual("cancelled");
});
