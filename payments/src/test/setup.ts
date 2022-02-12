import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

declare global {
  var signin: (id1?: string) => string[];
}
let mongo: any;
jest.mock("../nats-wrapper");
beforeAll(async () => {
  process.env.JWT_SECRET_KEY = "abcd123";
  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = (id1?: string) => {
  const id = id1 || new mongoose.Types.ObjectId().toHexString();
  const userJWT = jwt.sign(
    { id, email: "test@test.com" },
    process.env.JWT_SECRET_KEY!
  );
  const sessionJSON = JSON.stringify({ jwt: userJWT });
  const base64 = Buffer.from(sessionJSON).toString("base64");
  return [`session=${base64}`];
};
