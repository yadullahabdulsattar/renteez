const express = require("express");
const cors = require("cors");
const middlewareCustom = require("./middleware/middlewareCustom");
const connectDB = require("./config/db");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./config/swaggerConfig");

connectDB();

const app = express();
app.use(cors());

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: false }));

const listingRouter = require("./routers/listing");
const signinRouter = require("./routers/signin");
const signupRouter = require("./routers/signup");
const usersRouter = require("./routers/users");

app.use("/api/listings", listingRouter);
app.use("/api/signin", signinRouter);
app.use("/api/signup", signupRouter);
app.use("/api/user", usersRouter);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use(middlewareCustom.requestLogger);
app.use(middlewareCustom.unknownEndpoint);
app.use(middlewareCustom.errorHandler);

module.exports = app;
