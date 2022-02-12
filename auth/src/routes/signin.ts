import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { body } from "express-validator";
import { Password } from "../helpers/password";
import { User } from "../models/User-Model";
import { validateRequest, BadRequestError } from "@apurva2307/error-handler";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid."),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password must be provided."),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequestError("Kindly provide email and password.");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new BadRequestError("Wrong credentials provided.");
    }
    if (!(await Password.compare(user.password, password))) {
      throw new BadRequestError("Wrong credentials provided.");
    }
    const userJWT = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET_KEY!
    );
    req.session = { jwt: userJWT };
    res.status(200).json({ user });
  }
);

export { router as signinRouter };
