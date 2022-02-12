import request from "supertest";
import { app } from "../../app";

it("return a 201 on successful signup", () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "abcd",
    })
    .expect(201);
});
it("return a 400 on invalid email signup", () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test",
      password: "abcd",
    })
    .expect(400);
});
it("return a 400 on invalid password signup", () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "abc",
    })
    .expect(400);
});
it("return a 400 on missing parameters signup", () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      password: "abc",
    })
    .expect(400);
});
it("signup disallows duplicate email", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "abcd",
    })
    .expect(201);
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "abcd",
    })
    .expect(400);
});
it("sets cookie after successful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "abcd",
    })
    .expect(201);
  expect(response.get("set-Cookie")).toBeDefined();
});
