import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/Ticket-Model";

const createTicket = () => {
  return request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "concert", price: 25 });
};

it("get tickets with status 200", async () => {
  await createTicket();
  await createTicket();
  await createTicket();
  const response = await request(app).get("/api/tickets").send().expect(200);

  expect(response.body.tickets.length).toEqual(3);
});
