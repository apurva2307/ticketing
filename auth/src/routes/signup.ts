import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import {
  validateRequest,
  BadRequestError,
  RequestValidationError,
} from "@apurva2307/error-handler";
import { User } from "../models/User-Model";
const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid."),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters."),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { email, password } = req.body;
    const existinguser = await User.findOne({ email });
    if (existinguser) {
      throw new BadRequestError(`user with email: ${email} already exists.`);
    }
    const user = User.build({ email, password });
    await user.save();
    const userJWT = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET_KEY!
    );
    req.session = { jwt: userJWT };
    res.status(201).json({ user });
  }
);

export { router as signupRouter };
