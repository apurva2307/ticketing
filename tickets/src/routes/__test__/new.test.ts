import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/Ticket-Model";
import {natsWrapper} from "../../nats-wrapper";

it("has a route handler listening to /api/tickets for post requests", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).not.toEqual(404);
});
it("can only be accessed if user is signed in", async () => {
  await request(app).post("/api/tickets").send({}).expect(401);
});
it("returns other than 401 if user is signed in", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({});
  expect(response.status).not.toEqual(401);
});
it("returns error if an invalid title is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "", price: 10 })
    .expect(400);
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ price: 10 })
    .expect(400);
});
it("returns error if an invalid price is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "bookmyshow" })
    .expect(400);
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "bookmyshow", price: -29 })
    .expect(400);
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "bookmyshow", price: "" })
    .expect(400);
});
it("creates a ticket with valid inputs", async () => {
  let ticket = await Ticket.find({});
  expect(ticket.length).toEqual(0);
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "bookmyshow", price: 29 })
    .expect(201);
  ticket = await Ticket.find({});
  expect(ticket.length).toEqual(1);
});
it("publish a event", async() => {
  const title = "concert";
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title, price: 29 })
    .expect(201);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
})