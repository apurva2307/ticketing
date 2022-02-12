import express, { Request, Response } from "express";
import { getCurrentUser } from "@apurva2307/error-handler";
const router = express.Router();

router.get(
  "/api/users/currentuser",
  getCurrentUser,
  (req: Request, res: Response) => {
    res.status(200).json({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRouter };
