import express from "express";
import { Ticket } from "../models/Ticket-Model";

const router = express.Router();

router.get("/api/tickets", async (req, res) => {
  const tickets = await Ticket.find({});
  res.status(200).json({ tickets });
});

export { router as getTicketsRouter };
