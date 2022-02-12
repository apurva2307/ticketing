import request from "supertest";
import { app } from "../../app";

it("no cookie after unsuccessful signin", async () => {
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
  const response = await request(app)
    .post("/api/users/signout")
    .send({
      email: "test@test.com",
      password: "abcd",
    })
    .expect(200);
  console.log(response.get("set-Cookie"));
  expect(response.get("set-Cookie")[0]).toEqual(
    "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
  );
});
