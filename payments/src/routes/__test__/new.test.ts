import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { OrderStatus } from "@apurva2307/error-handler";
import { Order } from "../../models/Order-Model";
import { natsWrapper } from "../../nats-wrapper";
import { stripe } from "../../stripe";
jest.mock("../../stripe");
it("returns a 404 when purchasing an order that does not exist", async () => {
  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin())
    .send({
      token: "adfg",
      orderId: new mongoose.Types.ObjectId().toHexString(),
    })
    .expect(404);
});
it("returns a 401 when order does not belong to user", async () => {
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    price: 20,
    userId: "abcd",
    status: OrderStatus.Created,
  });
  await order.save();
  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin())
    .send({
      token: "adfg",
      orderId: order.id,
    })
    .expect(401);
});
it("returns 400 when purchasing a cancelled order", async () => {
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    price: 20,
    userId: new mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.Cancelled,
  });
  await order.save();
  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin(order.userId))
    .send({
      token: "adfg",
      orderId: order.id,
    })
    .expect(400);
});

it("returns a 201 with valid inputs", async () => {
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    price: 20,
    userId: new mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.Created,
  });
  await order.save();
  const response = await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin(order.userId))
    .send({
      token: "tok_visa",
      orderId: order.id,
    })
    .expect(201);
  expect(response.body.payment.paymentId).toEqual("1234");
  expect(response.body.payment.orderId).toEqual(order.id);
});
