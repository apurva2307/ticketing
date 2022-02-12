import request from "supertest";
import { app } from "../../app";

it("return a 200 on successful sigin", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "abcd",
    })
    .expect(201);
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "abcd",
    })
    .expect(200);
});
it("return a 400 on invalid email or password sigin", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "abcd",
    })
    .expect(201);
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test1@test.com",
      password: "abcd",
    })
    .expect(400);
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "abcde",
    })
    .expect(400);
});
it("sets cookie after successful signin", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "abcd",
    })
    .expect(201);
  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "abcd",
    })
    .expect(200);
  expect(response.get("Set-Cookie")).toBeDefined();
});
