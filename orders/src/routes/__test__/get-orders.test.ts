import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { Ticket } from "../../models/Ticket-Model";

const buildTicket = async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 25,
    id: new mongoose.Types.ObjectId().toHexString(),
  });
  await ticket.save();
  return ticket;
};

it("get orderss with status 200 for a particular user", async () => {
  const ticketOne = await buildTicket();
  const ticketTwo = await buildTicket();
  const ticketThree = await buildTicket();
  const userOne = global.signin();
  const userTwo = global.signin();
  await request(app)
    .post("/api/orders")
    .set("Cookie", userOne)
    .send({ ticketId: ticketOne.id })
    .expect(201);
  const {
    body: { order: orderOne },
  } = await request(app)
    .post("/api/orders")
    .set("Cookie", userTwo)
    .send({ ticketId: ticketTwo.id })
    .expect(201);
  const {
    body: { order: orderTwo },
  } = await request(app)
    .post("/api/orders")
    .set("Cookie", userTwo)
    .send({ ticketId: ticketThree.id })
    .expect(201);
  const orders = await request(app)
    .get("/api/orders")
    .set("Cookie", userTwo)
    .expect(200);
  expect(orders.body.orders.length).toEqual(2);
  expect(orders.body.orders[0].id).toEqual(orderOne.id);
  expect(orders.body.orders[1].id).toEqual(orderTwo.id);
  expect(orders.body.orders[0].ticket.id).toEqual(ticketTwo.id);
  expect(orders.body.orders[1].ticket.id).toEqual(ticketThree.id);
});
