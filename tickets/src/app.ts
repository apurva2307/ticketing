import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import {
  errorHandler,
  NotFoundError,
  getCurrentUser,
} from "@apurva2307/error-handler";
import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";
import { getTicketsRouter } from "./routes/get-tickets";
import { updateTicketRouter } from "./routes/update-ticket";
const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);
app.use(getCurrentUser);
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(getTicketsRouter);
app.use(updateTicketRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
