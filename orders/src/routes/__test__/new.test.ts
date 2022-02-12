import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";
import { Ticket } from "../../models/Ticket-Model";
import { natsWrapper } from "../../nats-wrapper";

it("returns 404 if no ticket exists with provided ticketId", async () => {
  const ticketId = new mongoose.Types.ObjectId().toHexString();
  const response = await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId })
    .expect(404);
});
it("returns 401 if ticket already created and reserved", async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 35,
    id: new mongoose.Types.ObjectId().toHexString(),
  });
  await ticket.save();
  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId: ticket.id })
    .expect(201);
  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId: ticket.id })
    .expect(400);
});
