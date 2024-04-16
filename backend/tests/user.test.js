const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");

let token = null;

beforeAll(async () => {
  await User.deleteMany({});
});

describe("Testing User API", () => {
  test("Creating a new user with all the required fields", async () => {
    const result = await api
      .post("/api/signup/")
      .send({
        title: "Mr",
        first_name: "John",
        last_name: "Paul",
        email: "john@paul.fi",
        password: "abcABC123!",
        phone: "+3173189711",
      })
      .expect(201);
    token = result.body.token;
  });

  test("Creating a new user with some missing fields", async () => {
    const result = await api
      .post("/api/signup")
      .send({
        title: "Mrs",
        first_name: "Jonna",
        last_name: "Paul",
        email: "",
        password: "defDEF456*",
        phone: "+231313818",
      })
      .expect(500);
  });

  test("Creating a new user with weak password", async () => {
    const result = await api
      .post("/api/signup")
      .send({
        title: "Mr",
        first_name: "John",
        last_name: "Doe",
        email: "john@doe.fi",
        password: "ceubniwe",
        phone: "+3276287642",
      })
      .expect(500);
  });

  test("Logging in a non existing user", async () => {
    const result = await api
      .post("/api/signin")
      .send({
        email: "mule@donkey.fi",
        password: "heeHAW000?",
      })
      .expect(400);
  });

  test("Logging in an user with valid credentials", async () => {
    const result = await api
      .post("/api/signin")
      .send({
        email: "john@paul.fi",
        password: "abcABC123!",
      })
      .expect(200);
    expect(result.body).toHaveProperty("token");
  });

  test("Retrieving an user info with its token", async () => {
    const result = await api
      .get("/api/user/me")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
    expect(result.body).toHaveProperty("_id");
  });
});

afterAll(() => {
  mongoose.connection.close();
});
