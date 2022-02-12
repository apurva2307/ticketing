import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";
import { Ticket } from "../../models/Ticket-Model";
import { natsWrapper } from "../../nats-wrapper";

it("returns a 401 if user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({ title: "concert", price: 25 })
    .expect(401);
});
it("returns a 404 if provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({ title: "concert", price: 25 })
    .expect(404);
});
it("returns a 401 if user does not own the ticket", async () => {
  const response = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", global.signin())
    .send({ title: "concert", price: 25 })
    .expect(201);
  await request(app)
    .put(`/api/tickets/${response.body.ticket.id}`)
    .set("Cookie", global.signin())
    .send({ title: "bookmyshow", price: 25 })
    .expect(401);
});
it("returns a 400 if user provides an invalid title or price", async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", cookie)
    .send({ title: "concert", price: 25 })
    .expect(201);
  await request(app)
    .put(`/api/tickets/${response.body.ticket.id}`)
    .set("Cookie", cookie)
    .send({ title: "", price: 25 })
    .expect(400);
  await request(app)
    .put(`/api/tickets/${response.body.ticket.id}`)
    .set("Cookie", cookie)
    .send({ title: "book", price: -25 })
    .expect(400);
});
it("updates the ticket if valid inputs provided", async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", cookie)
    .send({ title: "concert", price: 25 })
    .expect(201);
  const ticket = await request(app)
    .put(`/api/tickets/${response.body.ticket.id}`)
    .set("Cookie", cookie)
    .send({ title: "book", price: 35 })
    .expect(200);
  expect(ticket.body.ticket.title).toEqual("book");
  expect(ticket.body.ticket.price).toEqual(35);
});
it("publish a event", async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", cookie)
    .send({ title: "concert", price: 25 })
    .expect(201);
  const ticket = await request(app)
    .put(`/api/tickets/${response.body.ticket.id}`)
    .set("Cookie", cookie)
    .send({ title: "book", price: 35 })
    .expect(200);
  expect(ticket.body.ticket.title).toEqual("book");
  expect(ticket.body.ticket.price).toEqual(35);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});

it("returns 400 if ticket is reserved", async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", cookie)
    .send({ title: "concert", price: 25 })
    .expect(201);
  const updateTicket = await Ticket.findById(response.body.ticket.id);
  updateTicket?.set({ orderId: new mongoose.Types.ObjectId().toHexString() });
  await updateTicket?.save();
  const ticket = await request(app)
    .put(`/api/tickets/${response.body.ticket.id}`)
    .set("Cookie", cookie)
    .send({ title: "book", price: 35 })
    .expect(400);
});
