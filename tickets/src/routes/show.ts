import express, { Request, Response } from "express";
import { Ticket } from "../models/Ticket-Model";
import { NotFoundError } from "@apurva2307/error-handler";

const router = express.Router();

router.get("/api/tickets/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const ticket = await Ticket.findById({ _id: id });
  if (!ticket) {
    throw new NotFoundError();
  }

  res.status(200).json({ ticket });
});

export { router as showTicketRouter };
