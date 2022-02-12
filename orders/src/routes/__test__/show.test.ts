import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/Ticket-Model";

it("get order with status 200 for a particular user", async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 25,
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
  const res = await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", userOne)
    .send()
    .expect(200);
  expect(res.body.order.ticket.title).toEqual("concert");
  expect(res.body.order.ticket.price).toEqual(25);
  expect(res.body.order.id).toEqual(order.id);
});
it("gets status 401 if retrieving other user's order", async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 25,
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
  const res = await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", global.signin())
    .send()
    .expect(401);
});
it("gets status 404 if no order found with provided id", async () => {
  const orderId = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .get(`/api/orders/${orderId}`)
    .set("Cookie", global.signin())
    .send()
    .expect(404);
});
